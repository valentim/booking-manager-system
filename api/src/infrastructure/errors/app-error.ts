export class AppError extends Error {
    public code: number;
    public error: Error;

    constructor(code: number, message: string, error: Error) {
      super(message);

      this.code = code;
      this.error = error;
    }

    public getError() {
        return {
            status: 'error',
            message: this.message
        };
    }
}