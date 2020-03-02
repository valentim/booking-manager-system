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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai = __importStar(require("chai"));
const sinon = __importStar(require("sinon"));
const reservoir_1 = require("../../../../src/domain/reservations/services/reservoir");
const reservation_repository_1 = require("../../../../src/domain/reservations/repositories/reservation-repository");
const restaurant_repository_1 = require("../../../../src/domain/restaurants/repositories/restaurant-repository");
describe('Test Reservoir service', () => {
    let sandbox = undefined;
    let reservoir;
    let reservation;
    const reservationRepository = new reservation_repository_1.ReservationRepository();
    const restaurantRepository = new restaurant_repository_1.RestaurantRepository();
    before(() => {
        sandbox = sinon.createSandbox();
        reservation = {
            user: 'asd',
            restaurantGuid: 'asd',
            tableGuid: 'asd',
            when: '2020-12-01 10:00:00'
        };
        reservoir = new reservoir_1.Reservoir(reservationRepository, restaurantRepository);
    });
    it('Should make a reservation', () => __awaiter(void 0, void 0, void 0, function* () {
        const fakeRestaurant = {
            closesAt: '10:00 PM',
            opensAt: '09:00 AM'
        };
        const reservationSpy = sandbox.spy().withArgs(reservation);
        sandbox.replace(restaurantRepository, 'getRestaurantAndTable', sandbox['fake'].resolves(fakeRestaurant));
        sandbox.replace(reservationRepository, 'save', reservationSpy);
        yield reservoir.makeReservation(reservation);
        chai.expect(reservationSpy.called);
    }));
    it('Should throw an exception when the reservation is out of the period that the restaurant is open', () => __awaiter(void 0, void 0, void 0, function* () {
        const fakeRestaurant = {
            closesAt: '10:00 PM',
            opensAt: '10:01 AM'
        };
        sandbox.replace(restaurantRepository, 'getRestaurantAndTable', sandbox['fake'].resolves(fakeRestaurant));
        sandbox.replace(reservationRepository, 'save', sandbox.spy());
        try {
            yield reservoir.makeReservation(reservation);
        }
        catch (err) {
            chai.expect(err).to.be.eql({ code: 90001 });
        }
    }));
    afterEach(() => {
        sandbox.restore();
    });
});
//# sourceMappingURL=reservoir.spec.js.map