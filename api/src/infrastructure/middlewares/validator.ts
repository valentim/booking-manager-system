import * as Joi from 'joi';
import { Context } from 'koa';
import { IMiddleware } from 'koa-router';
import { FieldError } from '../errors/field-error';

export interface SchemaMap {
  params?: { [key: string]: Joi.SchemaLike } | Joi.ArraySchema;

  request?: {
    body?: { [key: string]: Joi.SchemaLike } | Joi.ArraySchema
    headers?: { [key: string]: Joi.SchemaLike }
  };

  response?: {
    body?: { [key: string]: Joi.SchemaLike } | Joi.ArraySchema
    headers?: { [key: string]: Joi.SchemaLike }
  };
}

export function validate(schema: SchemaMap): IMiddleware {
  return async (ctx: Context, next: () => Promise<any>) => {
    const valResult = Joi.validate(ctx, schema, {
      allowUnknown: true,
      abortEarly: false
    });

    if (valResult.error) {
      throw new FieldError(
        valResult.error.message,
        valResult.error.details.map(f => ({
          name: f.context.label
        })),
        valResult.error
      );
    }

    await next();
  };
}