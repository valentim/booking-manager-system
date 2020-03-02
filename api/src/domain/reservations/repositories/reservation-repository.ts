import ReservationEntity, { IReservation } from '../entities/reservation-entity';

export class ReservationRepository {
    public async save(newReservation: IReservation): Promise<IReservation> {
        return await ReservationEntity.create(newReservation);
    }

    public async update(newReservation: IReservation, reservationGuid: string): Promise<IReservation> {
        return await ReservationEntity.findByIdAndUpdate(reservationGuid, newReservation);
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
}