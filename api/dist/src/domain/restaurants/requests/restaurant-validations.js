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
const timeOfTheDay = Joi.extend((joi) => ({
    base: Joi.string(),
    name: 'string',
    language: {
        value: 'The time format needs to be HH:MM PM|AM eg. 01:00 PM / 01:00 AM'
    },
    rules: [
        {
            name: 'rules',
            validate(params, value, state, options) {
                const regex = /^([0-1][0-2]|0[0-9]):[0-5][0-9].*[PM|AM]$/gmi;
                if (regex.exec(value) === null) {
                    return this.createError('string.value', { v: value }, state, options);
                }
                return value;
            }
        }
    ]
}));
exports.createRestaurants = {
    name: Joi.string().required(),
    opensAt: timeOfTheDay.string().rules(),
    closesAt: timeOfTheDay.string().rules()
};
//# sourceMappingURL=restaurant-validations.js.map