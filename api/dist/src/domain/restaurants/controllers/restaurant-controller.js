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
const restaurant_repository_1 = require("../repositories/restaurant-repository");
const restaurant_responses_1 = require("../responses/restaurant-responses");
const registration_errors_1 = require("../../../infrastructure/databases/nosql/errors/registration-errors");
const registration_custom_errors_1 = require("../errors/registration-custom-errors");
class RestaurantController {
    create(context, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const restaurant = context.request.body;
            const restaurantRepository = new restaurant_repository_1.RestaurantRepository();
            try {
                const registeredRestaurant = yield restaurantRepository.save(restaurant);
                restaurant_responses_1.RestaurantResponses.getSuccessResponse(context, registeredRestaurant);
            }
            catch (err) {
                throw new registration_errors_1.RegistrationError('registration failed', new registration_custom_errors_1.RegistrationCustomErrors(err));
            }
            yield next();
        });
    }
    list(context, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const restaurantRepository = new restaurant_repository_1.RestaurantRepository();
            try {
                const restaurants = yield restaurantRepository.list();
                restaurant_responses_1.RestaurantResponses.getRestaurantsResponse(context, restaurants);
            }
            catch (err) {
                throw new registration_errors_1.RegistrationError('List restaurants failed', new registration_custom_errors_1.RegistrationCustomErrors(err));
            }
            yield next();
        });
    }
    showTable(context, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const restaurantRepository = new restaurant_repository_1.RestaurantRepository();
            const restaurantGuid = context.params.restaurantGuid;
            const tableGuid = context.params.tableGuid;
            try {
                const restaurant = yield restaurantRepository.getRestaurantAndTable(restaurantGuid, tableGuid);
                restaurant_responses_1.RestaurantResponses.getTableResponse(context, restaurant);
            }
            catch (err) {
                throw new registration_errors_1.RegistrationError('Get table failed', new registration_custom_errors_1.RegistrationCustomErrors(err));
            }
            yield next();
        });
    }
}
exports.RestaurantController = RestaurantController;
//# sourceMappingURL=restaurant-controller.js.map