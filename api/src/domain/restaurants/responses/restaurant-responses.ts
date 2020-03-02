import { IRestaurant } from '../entities/restaurant-entity';
import { Context } from 'koa';
import { ITable } from '../entities/table-entity';

export class RestaurantResponses {
    public static getSuccessResponse(ctx: Context, restaurant: IRestaurant) {
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

    public static getRestaurantsResponse(ctx: Context, restaurants: IRestaurant[]) {
        const response = {
            status: 'success',
            data: restaurants.map((restaurant: IRestaurant) => {
                return {
                    guid: restaurant._id,
                    name: restaurant.name,
                    tables: restaurant.tables.map((table: ITable) => {
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

    public static getTableResponse(ctx: Context, restaurant: IRestaurant) {
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