import { Context, Next } from 'koa';
import { IRestaurant } from '../entities/restaurant-entity';
import { RestaurantRepository } from '../repositories/restaurant-repository';
import { RestaurantResponses } from '../responses/restaurant-responses';
import { RegistrationError } from '../../../infrastructure/databases/nosql/errors/registration-errors';
import { RegistrationCustomErrors } from '../errors/registration-custom-errors';

export class RestaurantController {
    public async create(context: Context, next: Next) {
        const restaurant = context.request.body as IRestaurant;
        const restaurantRepository = new RestaurantRepository();

        try {
            const registeredRestaurant = await restaurantRepository.save(restaurant);
            RestaurantResponses.getSuccessResponse(context, registeredRestaurant);
        } catch (err) {
            throw new RegistrationError('registration failed', new RegistrationCustomErrors(err));
        }

        await next();
    }

    public async list(context: Context, next: Next) {
        const restaurantRepository = new RestaurantRepository();

        try {
            const restaurants = await restaurantRepository.list();
            RestaurantResponses.getRestaurantsResponse(context, restaurants);
        } catch (err) {
            throw new RegistrationError('List restaurants failed', new RegistrationCustomErrors(err));
        }

        await next();
    }

    public async showTable(context: Context, next: Next) {
        const restaurantRepository = new RestaurantRepository();
        const restaurantGuid = context.params.restaurantGuid;
        const tableGuid = context.params.tableGuid;

        try {
            const restaurant = await restaurantRepository.getRestaurantAndTable(restaurantGuid, tableGuid);
            RestaurantResponses.getTableResponse(context, restaurant);
        } catch (err) {
            throw new RegistrationError('Get table failed', new RegistrationCustomErrors(err));
        }

        await next();
    }
}