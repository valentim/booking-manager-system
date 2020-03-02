import { AppError } from '../../../errors/app-error';

export interface ICustomError {
    message: string;
    code: number;
    error: Error;
}

export class RegistrationError extends AppError {
    public customError: ICustomError;

    constructor(message: string, customError: ICustomError) {
        super(400, message, customError.error);
        this.customError = customError;
    }

    public getError() {
        const errorData = this.customError;
        this.message = errorData.message;
        this.code = errorData.code;

        return {
            ...super.getError(),
        };
    }
}