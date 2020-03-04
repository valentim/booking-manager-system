import { ICustomError } from '../../../infrastructure/databases/nosql/errors/registration-errors';

export class RegistrationCustomErrors implements ICustomError {

    public message: string;
    public code: number;
    public error: Error;

    constructor(error: Error) {
        const errorCode = error['code'] || 0;

        const messages = {
            11000: { message: 'This restaurant already exists', code: 409 },
            11001: { message: 'This table already exists', code: 409 },
            90000: { message: 'This restaurant does not exist', code: 404 },
            90001: { message: 'Close and open time must be different', code: 400 },
            90002: { message: 'Open date can not be bigger than Close date', code: 400 },
            default: { message: 'There is an exceptional error. Please, contact the administrator and inform the code', code: 500 }
        };

        const customError = messages[errorCode] || messages.default;
        this.message = customError.message;
        this.code = customError.code;
        this.error = error;
    }

}