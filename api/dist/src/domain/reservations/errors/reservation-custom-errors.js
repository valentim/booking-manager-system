"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ReservationCustomErrors {
    constructor(error) {
        const errorCode = error['code'] || 0;
        const messages = {
            11000: { message: 'This reservation already exists', code: 409 },
            90000: { message: 'This table does not exist', code: 404 },
            90001: { message: 'The restaurant is closed in this hour', code: 412 },
            90002: { message: 'This reservation does not exist', code: 404 },
            default: { message: 'There is an exceptional error. Please, contact the administrator and inform the code', code: 500 }
        };
        const customError = messages[errorCode] || messages.default;
        this.message = customError.message;
        this.code = customError.code;
        this.error = error;
    }
}
exports.ReservationCustomErrors = ReservationCustomErrors;
//# sourceMappingURL=reservation-custom-errors.js.map