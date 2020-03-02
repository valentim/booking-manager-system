import { AppError } from './app-error';

export interface Fields {
    name: string;
  }

export class FieldError extends AppError {
    public fields: Fields[];

    constructor(message: string, fields: Fields[], error: Error) {
      super(400, message, error);
      this.fields = fields;
    }

    public getError() {
      return {
        ...super.getError(),
        fields: this.fields
      };
    }
}