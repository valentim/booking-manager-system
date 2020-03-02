"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_1 = __importDefault(require("koa"));
const controllers_1 = require("./domain/restaurants/controllers");
const mongodb_1 = require("./infrastructure/databases/nosql/mongodb");
const koa_router_1 = __importDefault(require("koa-router"));
const koa_bodyparser_1 = __importDefault(require("koa-bodyparser"));
const cors = __importStar(require("@koa/cors"));
const middleware = __importStar(require("./infrastructure/middlewares"));
const restaurantValidations = __importStar(require("./domain/restaurants/validations/requests"));
const reservationValidations = __importStar(require("./domain/reservations/validations/requests/reservation-validations"));
const validations = __importStar(require("./infrastructure/validations/requests/guid-validations"));
const reservation_controller_1 = require("./domain/reservations/controllers/reservation-controller");
const app = new koa_1.default();
const restaurantController = new controllers_1.RestaurantController();
const tableController = new controllers_1.TableController();
const reservationController = new reservation_controller_1.ReservationController();
const nosql = new mongodb_1.MongoDB();
const router = new koa_router_1.default({ prefix: '/v1' });
nosql.connect('mongodb://root:1234@127.0.0.1:27017/booking?authSource=admin');
router.post('/restaurants', koa_bodyparser_1.default(), middleware.validate({ request: { body: restaurantValidations.createRestaurants } }), restaurantController.create);
router.get('/restaurants', koa_bodyparser_1.default(), restaurantController.list);
router.post('/restaurants/:restaurantGuid/tables', koa_bodyparser_1.default(), middleware.validate({ params: restaurantValidations.restaurantGuid }), tableController.create);
router.get('/restaurants/:restaurantGuid/tables', koa_bodyparser_1.default(), middleware.validate({ params: Object.assign({}, restaurantValidations.restaurantGuid) }), tableController.tables);
router.post('/restaurants/:restaurantGuid/tables/:tableGuid/reservations', koa_bodyparser_1.default(), middleware.validate({
    params: Object.assign(Object.assign({}, restaurantValidations.restaurantGuid), restaurantValidations.tableGuid),
    request: { body: reservationValidations.createReservation }
}), reservationController.create);
router.put('/restaurants/:restaurantGuid/tables/:tableGuid/reservations/:reservationGuid', koa_bodyparser_1.default(), middleware.validate({
    params: Object.assign(Object.assign(Object.assign({}, validations.restaurantGuid), validations.tableGuid), validations.reservationGuid),
    request: { body: reservationValidations.createReservation }
}), reservationController.update);
router.delete('/restaurants/:restaurantGuid/tables/:tableGuid/reservations/:reservationGuid', koa_bodyparser_1.default(), middleware.validate({
    params: Object.assign(Object.assign(Object.assign({}, validations.restaurantGuid), validations.tableGuid), validations.reservationGuid)
}), reservationController.cancel);
router.get('/restaurants/:restaurantGuid/tables/:tableGuid/reservations', koa_bodyparser_1.default(), middleware.validate({
    params: Object.assign(Object.assign({}, validations.restaurantGuid), validations.tableGuid)
}), reservationController.showReservations);
router.get('/restaurants/:restaurantGuid/tables/:tableGuid', koa_bodyparser_1.default(), middleware.validate({
    params: Object.assign(Object.assign({}, validations.restaurantGuid), validations.tableGuid)
}), restaurantController.showTable);
app.use(cors.default());
app.use(middleware.errorHandler());
app.use(router.routes());
app.listen(3000);
//# sourceMappingURL=index.js.map