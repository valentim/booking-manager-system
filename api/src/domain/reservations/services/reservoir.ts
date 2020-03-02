import { ReservationRepository } from '../repositories/reservation-repository';
import { RestaurantRepository } from '../../restaurants/repositories/restaurant-repository';
import { IReservation } from '../entities/reservation-entity';
import moment = require('moment-timezone');

export class Reservoir {
    private reservationRepository: ReservationRepository;
    private restaurantRepository: RestaurantRepository;

    constructor(reservationRepository: ReservationRepository, restaurantRepository: RestaurantRepository) {
        this.reservationRepository = reservationRepository;
        this.restaurantRepository = restaurantRepository;
    }

    public async makeReservation(reservation: IReservation): Promise<IReservation> {
        await this.checkRestaurantWorkPeriod(reservation);

        return await this.reservationRepository.save(reservation);
    }

    public async updateReservation(reservation: IReservation, reservationGuid: string): Promise<IReservation> {
        await this.checkCurrentReservation(reservationGuid);
        await this.checkRestaurantWorkPeriod(reservation);

        return await this.reservationRepository.update(reservation, reservationGuid);
    }

    public async cancelReservation(reservationGuid: string) {
        await this.checkCurrentReservation(reservationGuid);

        const reservation = {
            canceledAt: new Date()
        } as IReservation;

        return await this.reservationRepository.update(reservation, reservationGuid);
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

    private async checkCurrentReservation(reservationGuid: string) {
        const currentReservation = await this.reservationRepository.getReservation(reservationGuid);

        if (!currentReservation) {
            throw { code: 90002 };
        }
    }

    private async checkRestaurantWorkPeriod(reservation: IReservation) {
        const restaurant = await this.restaurantRepository.getRestaurantAndTable(reservation.restaurantGuid, reservation.tableGuid);

        const date = moment(reservation.when, 'YYYY-MM-DD hh:mm');
        const reservationDate = date.format('YYYY-MM-DD');
        const opensAt = moment(`${reservationDate} ${restaurant.opensAt}`, 'YYYY-MM-DD hh:mm A');
        const closesAt = moment(`${reservationDate} ${restaurant.closesAt}`, 'YYYY-MM-DD hh:mm A');

        if (!date.isBetween(opensAt, closesAt)) {
            throw { code: 90001 };
        }
    }
}
