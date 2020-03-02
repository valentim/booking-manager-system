"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ReservationResponses {
    static getSuccessResponse(ctx, reservation, httpStatusCode) {
        const response = {
            status: 'success',
            reservation_code: reservation._id
        };
        ctx.body = response;
        ctx.status = httpStatusCode;
    }
    static getReservationResponse(ctx, reservations) {
        const response = {
            status: 'success',
            data: reservations.map((r) => {
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
exports.ReservationResponses = ReservationResponses;
//# sourceMappingURL=reservation-responses.js.map