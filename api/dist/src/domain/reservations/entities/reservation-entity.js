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
const ReservationSchema = new mongoose_1.Schema({
    user: { type: String, required: true },
    tableGuid: { type: String, required: true },
    restaurantGuid: { type: String, required: true },
    when: { type: Date, required: true, unique: true },
    canceledAt: { type: Date },
});
exports.default = mongoose_1.default.model('Reservation', ReservationSchema);
//# sourceMappingURL=reservation-entity.js.map