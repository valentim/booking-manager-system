"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TableResponses {
    static getSuccessResponse(ctx, table) {
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
    static getTablesResponse(ctx, tables) {
        const response = {
            status: 'success',
            data: tables.map((t) => {
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
exports.TableResponses = TableResponses;
//# sourceMappingURL=table-responses.js.map