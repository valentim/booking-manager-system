import ReservationEntity, { IReservation } from '../entities/reservation-entity';
import SQSQueueNameEntity, { ISQSQueueName } from '../entities/sqs-queue-name-entity';
import moment = require('moment-timezone');

export class ReservationRepository {
    public async save(newReservation: IReservation): Promise<IReservation> {
        return await ReservationEntity.create(newReservation);
    }

    public async update(newReservation: IReservation, reservationGuid: string): Promise<IReservation> {
        return await ReservationEntity.findByIdAndUpdate(reservationGuid, newReservation);
    }

    public async delete(reservationGuid: string): Promise<IReservation> {
        return await ReservationEntity.findByIdAndDelete(reservationGuid);
    }

    public async getReservation(reservationGuid: string): Promise<IReservation> {
        return await ReservationEntity.findById(reservationGuid);
    }

    public async getReservations(restaurantGuid: string, tableGuid: string): Promise<IReservation[]> {
        return await ReservationEntity.find({
            restaurantGuid,
            tableGuid,
            // tslint:disable-next-line: no-null-keyword
            canceledAt: null
        });

    }

    public async saveQueueNames(SQSQueueName: ISQSQueueName): Promise<ISQSQueueName> {
        return await SQSQueueNameEntity.create(SQSQueueName);
    }

    public async getQueueNames(restaurantGuid: string): Promise<ISQSQueueName[]> {
        return await SQSQueueNameEntity.find({
            when: {
                '$gte': moment().toDate()
            },
            restaurantGuid
        });
    }
}