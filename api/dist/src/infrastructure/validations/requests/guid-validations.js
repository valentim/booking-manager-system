"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Joi = __importStar(require("joi"));
const mongoose_1 = __importDefault(require("mongoose"));
const objectId = Joi.extend((joi) => ({
    base: Joi.string(),
    name: 'string',
    language: {
        value: 'Guid must be an ObjectId'
    },
    rules: [
        {
            name: 'mongoDBObjectId',
            validate(params, value, state, options) {
                if (!mongoose_1.default.Types.ObjectId.isValid(value)) {
                    return this.createError('string.value', { v: value }, state, options);
                }
                return value;
            }
        }
    ]
}));
exports.tableGuid = {
    tableGuid: objectId.string().mongoDBObjectId().required()
};
exports.restaurantGuid = {
    restaurantGuid: objectId.string().mongoDBObjectId().required()
};
exports.reservationGuid = {
    reservationGuid: objectId.string().mongoDBObjectId().required()
};
//# sourceMappingURL=guid-validations.js.map