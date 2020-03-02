"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RestaurantResponses {
    static getSuccessResponse(ctx, restaurant) {
        const response = {
            status: 'success',
            data: {
                guid: restaurant._id,
                name: restaurant.name
            }
        };
        ctx.body = response;
        ctx.status = 201;
    }
    static getRestaurantsResponse(ctx, restaurants) {
        const response = {
            status: 'success',
            data: restaurants.map((restaurant) => {
                return {
                    guid: restaurant._id,
                    name: restaurant.name,
                    tables: restaurant.tables.map((table) => {
                        return {
                            guid: table._id,
                            positionName: table.positionName,
                            maxSeats: table.maxSeats
                        };
                    }),
                    opensAt: restaurant.opensAt,
                    closesAt: restaurant.closesAt
                };
            })
        };
        ctx.body = response;
        ctx.status = 200;
    }
    static getTableResponse(ctx, restaurant) {
        const response = {
            status: 'success',
            data: {
                guid: restaurant.tables[0]._id,
                positionName: restaurant.tables[0].positionName,
                maxSeats: restaurant.tables[0].maxSeats
            }
        };
        ctx.body = response;
        ctx.status = 200;
    }
}
exports.RestaurantResponses = RestaurantResponses;
//# sourceMappingURL=restaurant-responses.js.map