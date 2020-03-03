import { ReservationRepository } from '../repositories/reservation-repository';
import { RestaurantRepository } from '../../restaurants/repositories/restaurant-repository';
import { IReservation } from '../entities/reservation-entity';
import moment = require('moment-timezone');
import { IRestaurant } from '../../restaurants/entities/restaurant-entity';
import { ITable } from '../../restaurants/entities/table-entity';
import { Producer } from '../../../infrastructure/queue/sqs/producer';
import { Consumer } from '../../../infrastructure/queue/sqs/consumer';
import AWS, { SQS } from 'aws-sdk';


export class Reservoir {
    private reservationRepository: ReservationRepository;
    private restaurantRepository: RestaurantRepository;

    constructor(reservationRepository: ReservationRepository, restaurantRepository: RestaurantRepository) {
        this.reservationRepository = reservationRepository;
        this.restaurantRepository = restaurantRepository;
    }

    public async makeReservation(reservation: IReservation): Promise<IReservation> {
        const [restaurant, table] = await this.getRestaurant(reservation);

        await this.checkRestaurantWorkPeriod(reservation, restaurant);
        await this.checkTableSeats(reservation, table);

        return await this.reservationRepository.save(reservation);
    }

    public async updateReservation(reservation: IReservation, reservationGuid: string): Promise<IReservation> {
        const [restaurant, table] = await this.getRestaurant(reservation);

        await this.checkCurrentReservation(reservationGuid);
        await this.checkRestaurantWorkPeriod(reservation, restaurant);
        await this.checkTableSeats(reservation, table);

        return await this.reservationRepository.update(reservation, reservationGuid);
    }

    public async cancelReservation(reservationGuid: string, queueConsumer: Consumer) {
        await this.checkCurrentReservation(reservationGuid);

        const reservation = {
            canceledAt: new Date()
        } as IReservation;

        const updatedReservation = await this.reservationRepository.update(reservation, reservationGuid);
        const reservationInQueue = await queueConsumer.consume({
            queueName: `${moment(updatedReservation.when).unix()}${updatedReservation.tableGuid}.fifo`
        }).catch(err => {
            console.log(err);

            return undefined;
        });

        if (reservationInQueue) {
            const newReservation = reservationInQueue as IReservation;
            // tslint:disable-next-line: no-null-keyword
            newReservation.canceledAt = null;
            this.reservationRepository.update(newReservation as IReservation, reservationGuid);
        }

        return updatedReservation;
    }

    public async getReservations(restaurantGuid: string, tablesGuid: string): Promise<IReservation[]> {
        const reservations = await this.reservationRepository.getReservations(restaurantGuid, tablesGuid);

        return await Promise.all(reservations.map( async (r: IReservation) => {
            const restaurantAndTable = await this.restaurantRepository.getRestaurantAndTable(
                r.restaurantGuid,
                r.tableGuid
            );

            return {
                _id: r._id,
                when: r.when,
                user: r.user,
                restaurantGuid: r.restaurantGuid,
                tableGuid: r.tableGuid,
                restaurantName: restaurantAndTable.name,
                tableName: restaurantAndTable.tables[0].positionName
            } as IReservation;
        }));
    }

    public async putInWaiting(reservation: IReservation, queueProducer: Producer) {
        const [restaurant, ] = await this.getRestaurant(reservation);

        await this.checkRestaurantWorkPeriod(reservation, restaurant);

        queueProducer.send({
            queueName: `${moment(reservation.when).unix()}${reservation.tableGuid}.fifo`,
            message: reservation
        });

        return reservation;
    }

    private async checkCurrentReservation(reservationGuid: string) {
        const currentReservation = await this.reservationRepository.getReservation(reservationGuid);

        if (!currentReservation) {
            throw { code: 90002 };
        }
    }

    private async checkRestaurantWorkPeriod(reservation: IReservation, restaurant: IRestaurant) {

        const date = moment(reservation.when, 'YYYY-MM-DD hh:mm');
        const reservationDate = date.format('YYYY-MM-DD');
        const opensAt = moment(`${reservationDate} ${restaurant.opensAt}`, 'YYYY-MM-DD hh:mm A');
        const closesAt = moment(`${reservationDate} ${restaurant.closesAt}`, 'YYYY-MM-DD hh:mm A');

        if (!date.isBetween(opensAt, closesAt)) {
            throw { code: 90001 };
        }
    }

    private async checkTableSeats(reservation: IReservation, table: ITable) {

        if (table.maxSeats < reservation.seats) {
            throw { code: 90003 };
        }
    }

    private async getRestaurant(reservation: IReservation): Promise<[IRestaurant, ITable]> {
        const restaurant = await this.restaurantRepository.getRestaurantAndTable(reservation.restaurantGuid, reservation.tableGuid);

        if (!restaurant) {
            throw { code: 90004 };
        }

        if (!restaurant.tables) {
            throw { code: 90000 };
        }

        return [restaurant, restaurant.tables[0]];
    }
}
