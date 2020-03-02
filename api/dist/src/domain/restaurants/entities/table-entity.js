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
exports.TableSchema = new mongoose_1.Schema({
    positionName: { type: String, required: true, unique: true, sparse: true },
    maxSeats: { type: Number, required: true },
});
exports.default = mongoose_1.default.model('Table', exports.TableSchema);
//# sourceMappingURL=table-entity.js.map