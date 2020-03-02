"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const reservation_repository_1 = require("../repositories/reservation-repository");
const registration_errors_1 = require("../../../infrastructure/databases/nosql/errors/registration-errors");
const reservation_responses_1 = require("../responses/reservation-responses");
const reservation_custom_errors_1 = require("../errors/reservation-custom-errors");
const restaurant_repository_1 = require("../../restaurants/repositories/restaurant-repository");
const reservoir_1 = require("../services/reservoir");
class ReservationController {
    create(context, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const reservation = context.request.body;
            reservation.restaurantGuid = context.params.restaurantGuid;
            reservation.tableGuid = context.params.tableGuid;
            const reservationRepository = new reservation_repository_1.ReservationRepository();
            const restaurantRepository = new restaurant_repository_1.RestaurantRepository();
            const reservoir = new reservoir_1.Reservoir(reservationRepository, restaurantRepository);
            try {
                const newReservation = yield reservoir.makeReservation(reservation);
                reservation_responses_1.ReservationResponses.getSuccessResponse(context, newReservation, 201);
            }
            catch (err) {
                throw new registration_errors_1.RegistrationError('registration failed', new reservation_custom_errors_1.ReservationCustomErrors(err));
            }
            yield next();
        });
    }
    update(context, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const reservation = context.request.body;
            const reservationGuid = context.params.reservationGuid;
            reservation.restaurantGuid = context.params.restaurantGuid;
            reservation.tableGuid = context.params.tableGuid;
            const reservationRepository = new reservation_repository_1.ReservationRepository();
            const restaurantRepository = new restaurant_repository_1.RestaurantRepository();
            const reservoir = new reservoir_1.Reservoir(reservationRepository, restaurantRepository);
            try {
                const newReservation = yield reservoir.updateReservation(reservation, reservationGuid);
                reservation_responses_1.ReservationResponses.getSuccessResponse(context, newReservation, 200);
            }
            catch (err) {
                throw new registration_errors_1.RegistrationError('registration failed', new reservation_custom_errors_1.ReservationCustomErrors(err));
            }
            yield next();
        });
    }
    cancel(context, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const reservationGuid = context.params.reservationGuid;
            const reservationRepository = new reservation_repository_1.ReservationRepository();
            const restaurantRepository = new restaurant_repository_1.RestaurantRepository();
            const reservoir = new reservoir_1.Reservoir(reservationRepository, restaurantRepository);
            try {
                const newReservation = yield reservoir.cancelReservation(reservationGuid);
                reservation_responses_1.ReservationResponses.getSuccessResponse(context, newReservation, 200);
            }
            catch (err) {
                throw new registration_errors_1.RegistrationError('registration failed', new reservation_custom_errors_1.ReservationCustomErrors(err));
            }
            yield next();
        });
    }
    showReservations(context, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const reservationRepository = new reservation_repository_1.ReservationRepository();
            const restaurantRepository = new restaurant_repository_1.RestaurantRepository();
            const reservoir = new reservoir_1.Reservoir(reservationRepository, restaurantRepository);
            const restaurantGuid = context.params.restaurantGuid;
            const tableGuid = context.params.tableGuid;
            try {
                const reservations = yield reservoir.getReservations(restaurantGuid, tableGuid);
                reservation_responses_1.ReservationResponses.getReservationResponse(context, reservations);
            }
            catch (err) {
                throw new registration_errors_1.RegistrationError('registration failed', new reservation_custom_errors_1.ReservationCustomErrors(err));
            }
            yield next();
        });
    }
}
exports.ReservationController = ReservationController;
//# sourceMappingURL=reservation-controller.js.map