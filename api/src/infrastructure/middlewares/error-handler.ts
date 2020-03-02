import { Context } from 'koa';
import { IMiddleware } from 'koa-router';
import { AppError } from '../errors/app-error';

export function errorHandler(): IMiddleware {
    return async (ctx: Context, next: () => Promise<any>) => {
        try {
            await next();
        } catch (err) {
            console.log(err);
            if (err instanceof AppError) {
                ctx.body = err.getError();
                ctx.status = err.code || 500;
            } else {
                const error = new AppError(500, 'Internal Error Server', new Error(err));
                ctx.body = error.getError();
                ctx.status = error.code;
            }
        }
    };
}