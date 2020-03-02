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
const registration_errors_1 = require("../../../infrastructure/databases/nosql/errors/registration-errors");
const table_responses_1 = require("../responses/table-responses");
const registration_custom_errors_1 = require("../errors/registration-custom-errors");
class TableController {
    create(context, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const table = context.request.body;
            const restaurantGuid = context.params.restaurantGuid;
            const restaurantRepository = new restaurant_repository_1.RestaurantRepository();
            try {
                const registeredTable = yield restaurantRepository.addTable(restaurantGuid, table);
                table_responses_1.TableResponses.getSuccessResponse(context, registeredTable);
            }
            catch (err) {
                throw new registration_errors_1.RegistrationError('registration failed', new registration_custom_errors_1.RegistrationCustomErrors(err));
            }
            yield next();
        });
    }
    tables(context, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const restaurantGuid = context.params.restaurantGuid;
            const restaurantRepository = new restaurant_repository_1.RestaurantRepository();
            try {
                const tables = yield restaurantRepository.getTables(restaurantGuid);
                table_responses_1.TableResponses.getTablesResponse(context, tables);
            }
            catch (err) {
                throw new registration_errors_1.RegistrationError('registration failed', err);
            }
            yield next();
        });
    }
}
exports.TableController = TableController;
//# sourceMappingURL=table-controller.js.map