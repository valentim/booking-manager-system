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
const restaurant_entity_1 = __importDefault(require("../entities/restaurant-entity"));
class RestaurantRepository {
    save(newRestaurant) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield restaurant_entity_1.default.create(newRestaurant);
        });
    }
    getRestaurantAndTable(restaurantGuid, tableGuid) {
        return __awaiter(this, void 0, void 0, function* () {
            const restaurant = yield restaurant_entity_1.default.findOne({ _id: restaurantGuid, 'tables._id': tableGuid }, { 'tables.$': 1, opensAt: 1, closesAt: 1, name: 1 });
            return restaurant;
        });
    }
    getTables(restaurantGuid) {
        return __awaiter(this, void 0, void 0, function* () {
            const restaurant = yield restaurant_entity_1.default.findOne({ _id: restaurantGuid }, { tables: 1 });
            if (!restaurant) {
                throw { code: 90000 };
            }
            return restaurant.tables;
        });
    }
    list() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield restaurant_entity_1.default.find();
        });
    }
    addTable(restaurantGuid, newTable) {
        return __awaiter(this, void 0, void 0, function* () {
            const restaurant = yield restaurant_entity_1.default.findById(restaurantGuid);
            if (!restaurant) {
                throw { code: 90000 };
            }
            if (restaurant.tables.find((t) => t.positionName === newTable.positionName)) {
                throw { code: 11000 };
            }
            restaurant.tables.push(newTable);
            const updatedRestaurant = yield restaurant.save();
            return updatedRestaurant.tables.find((t) => t.positionName === newTable.positionName);
        });
    }
}
exports.RestaurantRepository = RestaurantRepository;
//# sourceMappingURL=restaurant-repository.js.map