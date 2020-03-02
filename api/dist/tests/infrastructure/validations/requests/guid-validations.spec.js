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
const validations = __importStar(require("../../../../src/infrastructure/validations/requests/guid-validations"));
describe('Test Guid custom validation', () => {
    it('Should accept the guid', () => __awaiter(void 0, void 0, void 0, function* () {
        const input = {
            reservationGuid: '5e5aa69e21d239a34cee1264'
        };
        const valResult = Joi.validate(input, Object.assign({}, validations.reservationGuid), {
            allowUnknown: true,
            abortEarly: false
        });
        chai.expect(valResult.error).to.be.null;
    }));
    it('Should return error related to the wrong guid', () => __awaiter(void 0, void 0, void 0, function* () {
        const input = {
            reservationGuid: '123'
        };
        const valResult = Joi.validate(input, { reservationGuid: validations.reservationGuid }, {
            allowUnknown: true,
            abortEarly: false
        });
        chai.expect(valResult.error).to.be.not.null;
    }));
});
//# sourceMappingURL=guid-validations.spec.js.map