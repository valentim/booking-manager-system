"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AppError extends Error {
    constructor(code, message, error) {
        super(message);
        this.code = code;
        this.error = error;
    }
    getError() {
        return {
            status: 'error',
            message: this.message
        };
    }
}
exports.AppError = AppError;
//# sourceMappingURL=app-error.js.map