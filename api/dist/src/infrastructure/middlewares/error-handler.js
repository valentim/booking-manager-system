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
Object.defineProperty(exports, "__esModule", { value: true });
const app_error_1 = require("../errors/app-error");
function errorHandler() {
    return (ctx, next) => __awaiter(this, void 0, void 0, function* () {
        try {
            yield next();
        }
        catch (err) {
            console.log(err);
            if (err instanceof app_error_1.AppError) {
                ctx.body = err.getError();
                ctx.status = err.code || 500;
            }
            else {
                const error = new app_error_1.AppError(500, 'Internal Error Server', new Error(err));
                ctx.body = error.getError();
                ctx.status = error.code;
            }
        }
    });
}
exports.errorHandler = errorHandler;
//# sourceMappingURL=error-handler.js.map