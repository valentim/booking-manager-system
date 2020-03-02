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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai = __importStar(require("chai"));
const Joi = __importStar(require("joi"));
const validations = __importStar(require("../../../../../src/domain/restaurants/validations/requests/restaurant-validations"));
describe('Test custom validation from restaurants', () => {
    it('Should accept the times', () => __awaiter(void 0, void 0, void 0, function* () {
        const dates = [
            '06:00 PM',
            '06:00 AM',
            '06:00 pm',
            '06:00 am',
            '10:00 am',
            '10:00am',
            '10:00pm',
        ];
        for (const date of dates) {
            const input = {
                name: '123',
                opensAt: date,
                closesAt: date
            };
            const valResult = Joi.validate(input, Object.assign({}, validations.createRestaurants), {
                allowUnknown: true,
                abortEarly: false
            });
            chai.expect(valResult.error).to.be.null;
        }
    }));
    it('Should return error related to the not valid times', () => __awaiter(void 0, void 0, void 0, function* () {
        const dates = [
            '06:010 PM',
            '060:01 PM',
            '060:01 M',
            '060:01',
            '0:01',
            '00:01',
        ];
        for (const date of dates) {
            const input = {
                name: '123',
                opensAt: date,
                closesAt: date
            };
            const valResult = Joi.validate(input, Object.assign({}, validations.createRestaurants), {
                allowUnknown: true,
                abortEarly: false
            });
            chai.expect(valResult.error).to.be.not.null;
        }
    }));
});
//# sourceMappingURL=restaurant-validations.spec.js.map