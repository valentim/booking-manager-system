"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const table_entity_1 = require("../entities/table-entity");
const RestaurantSchema = new mongoose_1.Schema({
    name: { type: String, required: true, unique: true },
    opensAt: { type: String, required: true },
    closesAt: { type: String, required: true },
    tables: [table_entity_1.TableSchema]
});
exports.default = mongoose_1.default.model('Restaurant', RestaurantSchema);
//# sourceMappingURL=restaurant-entity.js.map