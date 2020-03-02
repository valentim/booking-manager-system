import Koa from 'koa';
import { RestaurantController, TableController } from './domain/restaurants/controllers';
import { MongoDB } from './infrastructure/databases/nosql/mongodb';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import * as cors from '@koa/cors';
import * as middleware from './infrastructure/middlewares';
import * as restaurantValidations from './domain/restaurants/validations/requests';
import * as reservationValidations from './domain/reservations/validations/requests/reservation-validations';
import * as validations from './infrastructure/validations/requests/guid-validations';
import { ReservationController } from './domain/reservations/controllers/reservation-controller';


const app = new Koa();
const restaurantController = new RestaurantController();
const tableController = new TableController();
const reservationController = new ReservationController();
const nosql = new MongoDB();
const router = new Router({ prefix: '/v1' });

nosql.connect('mongodb://root:1234@127.0.0.1:27017/booking?authSource=admin');

router.post(
    '/restaurants',
    bodyParser(),
    middleware.validate({ request: { body: restaurantValidations.createRestaurants } }),
    restaurantController.create
);

router.get(
    '/restaurants',
    bodyParser(),
    restaurantController.list
);

router.post(
    '/restaurants/:restaurantGuid/tables',
    bodyParser(),
    middleware.validate({ params: restaurantValidations.restaurantGuid }),
    tableController.create
);

router.get(
    '/restaurants/:restaurantGuid/tables',
    bodyParser(),
    middleware.validate({ params: { ...restaurantValidations.restaurantGuid } }),
    tableController.tables
);

router.post(
    '/restaurants/:restaurantGuid/tables/:tableGuid/reservations',
    bodyParser(),
    middleware.validate({
        params: { ...restaurantValidations.restaurantGuid, ...restaurantValidations.tableGuid },
        request: { body: reservationValidations.createReservation }
    }),
    reservationController.create
);

router.put(
    '/restaurants/:restaurantGuid/tables/:tableGuid/reservations/:reservationGuid',
    bodyParser(),
    middleware.validate({
        params: {
            ...validations.restaurantGuid,
            ...validations.tableGuid,
            ...validations.reservationGuid
        },
        request: { body: reservationValidations.createReservation }
    }),
    reservationController.update
);

router.delete(
    '/restaurants/:restaurantGuid/tables/:tableGuid/reservations/:reservationGuid',
    bodyParser(),
    middleware.validate({
        params: {
            ...validations.restaurantGuid,
            ...validations.tableGuid,
            ...validations.reservationGuid
        }
    }),
    reservationController.cancel
);

router.get(
    '/restaurants/:restaurantGuid/tables/:tableGuid/reservations',
    bodyParser(),
    middleware.validate({
        params: {
            ...validations.restaurantGuid,
            ...validations.tableGuid
        }
    }),
    reservationController.showReservations
);

router.get(
    '/restaurants/:restaurantGuid/tables/:tableGuid',
    bodyParser(),
    middleware.validate({
        params: {
            ...validations.restaurantGuid,
            ...validations.tableGuid
        }
    }),
    restaurantController.showTable
);

app.use(cors.default());
app.use(middleware.errorHandler());
app.use(router.routes());
app.listen(3000);