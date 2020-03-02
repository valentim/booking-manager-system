"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_error_1 = require("../../../errors/app-error");
class RegistrationError extends app_error_1.AppError {
    constructor(message, customError) {
        super(400, message, customError.error);
        this.customError = customError;
    }
    getError() {
        const errorData = this.customError;
        this.message = errorData.message;
        this.code = errorData.code;
        return Object.assign({}, super.getError());
    }
}
exports.RegistrationError = RegistrationError;
//# sourceMappingURL=registration-errors.js.map