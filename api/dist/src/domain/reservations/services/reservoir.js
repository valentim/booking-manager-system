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
const moment = require("moment-timezone");
class Reservoir {
    constructor(reservationRepository, restaurantRepository) {
        this.reservationRepository = reservationRepository;
        this.restaurantRepository = restaurantRepository;
    }
    makeReservation(reservation) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.checkRestaurantWorkPeriod(reservation);
            return yield this.reservationRepository.save(reservation);
        });
    }
    updateReservation(reservation, reservationGuid) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.checkCurrentReservation(reservationGuid);
            yield this.checkRestaurantWorkPeriod(reservation);
            return yield this.reservationRepository.update(reservation, reservationGuid);
        });
    }
    cancelReservation(reservationGuid) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.checkCurrentReservation(reservationGuid);
            const reservation = {
                canceledAt: new Date()
            };
            return yield this.reservationRepository.update(reservation, reservationGuid);
        });
    }
    getReservations(restaurantGuid, tablesGuid) {
        return __awaiter(this, void 0, void 0, function* () {
            const reservations = yield this.reservationRepository.getReservations(restaurantGuid, tablesGuid);
            return yield Promise.all(reservations.map((r) => __awaiter(this, void 0, void 0, function* () {
                const restaurantAndTable = yield this.restaurantRepository.getRestaurantAndTable(r.restaurantGuid, r.tableGuid);
                return {
                    _id: r._id,
                    when: r.when,
                    user: r.user,
                    restaurantGuid: r.restaurantGuid,
                    tableGuid: r.tableGuid,
                    restaurantName: restaurantAndTable.name,
                    tableName: restaurantAndTable.tables[0].positionName
                };
            })));
        });
    }
    checkCurrentReservation(reservationGuid) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentReservation = yield this.reservationRepository.getReservation(reservationGuid);
            if (!currentReservation) {
                throw { code: 90002 };
            }
        });
    }
    checkRestaurantWorkPeriod(reservation) {
        return __awaiter(this, void 0, void 0, function* () {
            const restaurant = yield this.restaurantRepository.getRestaurantAndTable(reservation.restaurantGuid, reservation.tableGuid);
            const date = moment(reservation.when, 'YYYY-MM-DD hh:mm');
            const reservationDate = date.format('YYYY-MM-DD');
            const opensAt = moment(`${reservationDate} ${restaurant.opensAt}`, 'YYYY-MM-DD hh:mm A');
            const closesAt = moment(`${reservationDate} ${restaurant.closesAt}`, 'YYYY-MM-DD hh:mm A');
            if (!date.isBetween(opensAt, closesAt)) {
                throw { code: 90001 };
            }
        });
    }
}
exports.Reservoir = Reservoir;
//# sourceMappingURL=reservoir.js.map