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
const Joi = __importStar(require("joi"));
const field_error_1 = require("../errors/field-error");
function validate(schema) {
    return (ctx, next) => __awaiter(this, void 0, void 0, function* () {
        const valResult = Joi.validate(ctx, schema, {
            allowUnknown: true,
            abortEarly: false
        });
        if (valResult.error) {
            throw new field_error_1.FieldError(valResult.error.message, valResult.error.details.map(f => ({
                name: f.context.label
            })), valResult.error);
        }
        yield next();
    });
}
exports.validate = validate;
//# sourceMappingURL=validator.js.map