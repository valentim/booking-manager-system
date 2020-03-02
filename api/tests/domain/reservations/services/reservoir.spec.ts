import * as chai from 'chai';
import * as sinon from 'sinon';
import { Reservoir } from '../../../../src/domain/reservations/services/reservoir';
import { ReservationRepository } from '../../../../src/domain/reservations/repositories/reservation-repository';
import { RestaurantRepository } from '../../../../src/domain/restaurants/repositories/restaurant-repository';
import { IReservation } from '../../../../src/domain/reservations/entities/reservation-entity';
import { IRestaurant } from '../../../../src/domain/restaurants/entities/restaurant-entity';


describe('Test Reservoir service', () => {
    let sandbox: sinon.SinonSandbox = undefined;
    let reservoir: Reservoir;
    let reservation: IReservation;

    const reservationRepository = new ReservationRepository();
    const restaurantRepository = new RestaurantRepository();

    before(() => {
        sandbox = sinon.createSandbox();
        reservation = {
            user: 'asd',
            restaurantGuid: 'asd',
            tableGuid: 'asd',
            when: '2020-12-01 10:00:00'
        } as IReservation;

        reservoir = new Reservoir(reservationRepository, restaurantRepository);
    });

    it('Should make a reservation', async () => {
        const fakeRestaurant = {
            closesAt: '10:00 PM',
            opensAt: '09:00 AM'
        };

        const reservationSpy = sandbox.spy().withArgs(reservation);

        sandbox.replace(restaurantRepository, 'getRestaurantAndTable', sandbox['fake'].resolves((fakeRestaurant as IRestaurant)));
        sandbox.replace(reservationRepository, 'save', reservationSpy);

        await reservoir.makeReservation(reservation);

        chai.expect(reservationSpy.called);
    });

    it('Should throw an exception when the reservation is out of the period that the restaurant is open', async () => {
        const fakeRestaurant = {
            closesAt: '10:00 PM',
            opensAt: '10:01 AM'
        };

        sandbox.replace(restaurantRepository, 'getRestaurantAndTable', sandbox['fake'].resolves((fakeRestaurant as IRestaurant)));
        sandbox.replace(reservationRepository, 'save', sandbox.spy());

        try {
            await reservoir.makeReservation(reservation);
        } catch (err) {
            chai.expect(err).to.be.eql({ code: 90001 });
        }

    });

    afterEach(() => {
        sandbox.restore();
    });
});
