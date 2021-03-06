import { Context, Next } from 'koa';
import { ReservationRepository } from '../repositories/reservation-repository';
import { RegistrationError } from '../../../infrastructure/databases/nosql/errors/registration-errors';
import { ReservationResponses } from '../responses/reservation-responses';
import { IReservation } from '../entities/reservation-entity';
import { ReservationCustomErrors } from '../errors/reservation-custom-errors';
import { RestaurantRepository } from '../../restaurants/repositories/restaurant-repository';
import { Reservoir } from '../services/reservoir';

export class ReservationController {
    public async create(context: Context, next: Next) {
        const reservation = context.request.body as IReservation;

        reservation.restaurantGuid = context.params.restaurantGuid;
        reservation.tableGuid = context.params.tableGuid;

        const reservationRepository = new ReservationRepository();
        const restaurantRepository = new RestaurantRepository();
        const reservoir = new Reservoir(reservationRepository, restaurantRepository);

        try {
            const newReservation = await reservoir.makeReservation(reservation);
            ReservationResponses.getSuccessResponse(context, newReservation, 201);
        } catch (err) {
            throw new RegistrationError('registration failed', new ReservationCustomErrors(err));
        }

        await next();
    }

    public async tableQueue(context: Context, next: Next) {
        const reservation = context.request.body as IReservation;

        reservation.restaurantGuid = context.params.restaurantGuid;
        reservation.tableGuid = context.params.tableGuid;

        const reservationRepository = new ReservationRepository();
        const restaurantRepository = new RestaurantRepository();
        const reservoir = new Reservoir(reservationRepository, restaurantRepository);

        try {
            const newReservation = await reservoir.putInWaitingForTable(reservation, context.sqsProducer);
            ReservationResponses.getSuccessResponse(context, newReservation, 201);
        } catch (err) {
            throw new RegistrationError('Save queue failed', new ReservationCustomErrors(err));
        }

        await next();
    }

    public async restaurantQueue(context: Context, next: Next) {
        const reservation = context.request.body as IReservation;

        reservation.restaurantGuid = context.params.restaurantGuid;

        const reservationRepository = new ReservationRepository();
        const restaurantRepository = new RestaurantRepository();
        const reservoir = new Reservoir(reservationRepository, restaurantRepository);

        try {
            const newReservation = await reservoir.putInWaitingForRestaurant(reservation, context.sqsProducer);
            ReservationResponses.getSuccessResponse(context, newReservation, 201);
        } catch (err) {
            throw new RegistrationError('Save queue failed', new ReservationCustomErrors(err));
        }

        await next();
    }

    public async update(context: Context, next: Next) {
        const reservation = context.request.body as IReservation;
        const reservationGuid = context.params.reservationGuid;

        reservation.restaurantGuid = context.params.restaurantGuid;
        reservation.tableGuid = context.params.tableGuid;

        const reservationRepository = new ReservationRepository();
        const restaurantRepository = new RestaurantRepository();
        const reservoir = new Reservoir(reservationRepository, restaurantRepository);

        try {
            const newReservation = await reservoir.updateReservation(reservation, reservationGuid);
            ReservationResponses.getSuccessResponse(context, newReservation, 200);
        } catch (err) {
            throw new RegistrationError('Update registration failed', new ReservationCustomErrors(err));
        }

        await next();
    }

    public async cancel(context: Context, next: Next) {
        const reservationGuid = context.params.reservationGuid;
        const reservationRepository = new ReservationRepository();
        const restaurantRepository = new RestaurantRepository();
        const reservoir = new Reservoir(reservationRepository, restaurantRepository);

        try {
            const newReservation = await reservoir.cancelReservation(reservationGuid, context.sqsConsumer);
            ReservationResponses.getSuccessResponse(context, newReservation, 200);
        } catch (err) {
            throw new RegistrationError('Cancel registration failed', new ReservationCustomErrors(err));
        }

        await next();
    }

    public async showReservations(context: Context, next: Next) {
        const reservationRepository = new ReservationRepository();
        const restaurantRepository = new RestaurantRepository();
        const reservoir = new Reservoir(reservationRepository, restaurantRepository);
        const restaurantGuid = context.params.restaurantGuid;
        const tableGuid = context.params.tableGuid;

        try {
            const reservations = await reservoir.getReservations(restaurantGuid, tableGuid);
            ReservationResponses.getReservationsResponse(context, reservations);
        } catch (err) {
            throw new RegistrationError('Show reservations failed', new ReservationCustomErrors(err));
        }

        await next();
    }

    public async getReservation(context: Context, next: Next) {
        const reservationRepository = new ReservationRepository();
        const restaurantRepository = new RestaurantRepository();
        const reservoir = new Reservoir(reservationRepository, restaurantRepository);
        const reservationGuid = context.params.reservationGuid;

        try {
            const reservation = await reservoir.getReservation(reservationGuid);
            ReservationResponses.getSuccessResponse(context, reservation, 200);
        } catch (err) {
            throw new RegistrationError('Get reservation failed', new ReservationCustomErrors(err));
        }

        await next();
    }
}