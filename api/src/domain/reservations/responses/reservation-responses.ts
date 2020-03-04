import { Context } from 'koa';
import { IReservation } from '../entities/reservation-entity';

export class ReservationResponses {
    public static getSuccessResponse(ctx: Context, reservation: IReservation, httpStatusCode: number) {
        const response = {
            status: 'success',
            reservationCode: reservation._id,
            when: reservation.when,
            seats: reservation.seats
        };

        ctx.body = response;
        ctx.status = httpStatusCode;
    }

    public static getReservationsResponse(ctx: Context, reservations: IReservation[]) {
        const response = {
            status: 'success',
            data: reservations.map((r: IReservation) => {
                return {
                    reservationCode: r._id,
                    tableGuid: r.tableGuid,
                    restaurant: r.restaurantName,
                    table: r.tableName,
                    user: r.user,
                    when: r.when
                };
            })
        };

        ctx.body = response;
        ctx.status = 200;
    }
}