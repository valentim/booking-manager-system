import { Context } from 'koa';
import { ITable } from '../entities/table-entity';

export class TableResponses {
    public static getSuccessResponse(ctx: Context, table: ITable) {
        const response = {
            status: 'success',
            data: {
                guid: table._id,
                positionName: table.positionName,
                maxSeats: table.maxSeats
            }
        };

        ctx.body = response;
        ctx.status = 201;
    }

    public static getTablesResponse(ctx: Context, tables: ITable[]) {
        const response = {
            status: 'success',
            data: tables.map((t: ITable) => {
                return {
                    guid: t._id,
                    positionName: t.positionName,
                    maxSeats: t.maxSeats
                };
            })
        };

        ctx.body = response;
        ctx.status = 201;
    }
}