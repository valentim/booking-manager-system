"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const Joi = __importStar(require("joi"));
const reservationRange = Joi.extend((joi) => ({
    base: Joi.string(),
    name: 'date',
    language: {
        value: 'The range of reservation must be every one hour. eg. 10:00:00, 11:00:00...'
    },
    rules: [
        {
            name: 'period',
            validate(params, value, state, options) {
                const regex = /.*([0-1][0-9]|[2][0-4]):00:00$/gmi;
                if (regex.exec(value) === null) {
                    return this.createError('date.value', { v: value }, state, options);
                }
                return value;
            }
        }
    ]
}));
exports.createReservation = {
    user: Joi.string().required(),
    when: reservationRange.date().period().required(),
};
//# sourceMappingURL=reservation-validations.js.map