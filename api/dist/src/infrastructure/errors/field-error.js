"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_error_1 = require("./app-error");
class FieldError extends app_error_1.AppError {
    constructor(message, fields, error) {
        super(400, message, error);
        this.fields = fields;
    }
    getError() {
        return Object.assign(Object.assign({}, super.getError()), { fields: this.fields });
    }
}
exports.FieldError = FieldError;
//# sourceMappingURL=field-error.js.map