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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const reservation_entity_1 = __importDefault(require("../entities/reservation-entity"));
class ReservationRepository {
    save(newReservation) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield reservation_entity_1.default.create(newReservation);
        });
    }
    update(newReservation, reservationGuid) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield reservation_entity_1.default.findByIdAndUpdate(reservationGuid, newReservation);
        });
    }
    getReservation(reservationGuid) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield reservation_entity_1.default.findById(reservationGuid);
        });
    }
    getReservations(restaurantGuid, tableGuid) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield reservation_entity_1.default.find({
                restaurantGuid,
                tableGuid,
                // tslint:disable-next-line: no-null-keyword
                canceledAt: null
            });
        });
    }
}
exports.ReservationRepository = ReservationRepository;
//# sourceMappingURL=reservation-repository.js.map