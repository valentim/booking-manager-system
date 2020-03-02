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
const validations = __importStar(require("../../../../../src/domain/reservations/validations/requests/reservation-validations"));
describe('Test custom validation from reservation', () => {
    it('Should accept the dates', () => __awaiter(void 0, void 0, void 0, function* () {
        const dates = [
            '2020-01-01 06:00:00',
            '2020-01-01 07:00:00',
            '2020-01-01 08:00:00',
            '2020-01-01 09:00:00',
            '2020-01-01 10:00:00',
            '2020-01-01 11:00:00',
            '2020-01-01 12:00:00',
            '2020-01-01 13:00:00',
            '2020-01-01 14:00:00',
            '2020-01-01 15:00:00',
            '2020-01-01 20:00:00',
            '2020-01-01 21:00:00',
            '2020-01-01 23:00:00',
            '2020-01-01 00:00:00'
        ];
        for (const date of dates) {
            const input = {
                user: '123',
                when: date
            };
            const valResult = Joi.validate(input, Object.assign({}, validations.createReservation), {
                allowUnknown: true,
                abortEarly: false
            });
            chai.expect(valResult.error).to.be.null;
        }
    }));
    it('Should return error related to the not valid dates', () => __awaiter(void 0, void 0, void 0, function* () {
        const dates = [
            '2020-01-01 06:01:00',
            '2020-01-01 07:00:01',
            '2020-01-01 08:000:00',
            '2020-01-01 09:00:10',
            '2020-01-01 10:20:00',
            '2020/01/01 24:00:00',
            '01-01-2020 99:00:00',
            '01/01/2019 13:99:00',
            '2020-01-01 14:50:00',
            '2020-01-01 150:00:00',
            '2020-01-01 20:0:00',
            '2020-01-01 1:00:00',
            '2020-01-0 23:00:00',
            '020-01-01 00:00:001'
        ];
        for (const date of dates) {
            const input = {
                user: '123',
                when: date
            };
            const valResult = Joi.validate(input, Object.assign({}, validations.createReservation), {
                allowUnknown: true,
                abortEarly: false
            });
            chai.expect(valResult.error).to.be.not.null;
        }
    }));
});
//# sourceMappingURL=restaurant-validations.spec.js.map