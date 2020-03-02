import { Context, Next } from 'koa';
import { RestaurantRepository } from '../repositories/restaurant-repository';
import { RegistrationError } from '../../../infrastructure/databases/nosql/errors/registration-errors';
import { ITable } from '../entities/table-entity';
import { TableResponses } from '../responses/table-responses';
import { RegistrationCustomErrors } from '../errors/registration-custom-errors';

export class TableController {
    public async create(context: Context, next: Next) {
        const table = context.request.body as ITable;
        const restaurantGuid = context.params.restaurantGuid;
        const restaurantRepository = new RestaurantRepository();

        try {
            const registeredTable = await restaurantRepository.addTable(restaurantGuid, table);
            TableResponses.getSuccessResponse(context, registeredTable);
        } catch (err) {
            throw new RegistrationError('registration failed', new RegistrationCustomErrors(err));
        }

        await next();
    }

    public async tables(context: Context, next: Next) {
        const restaurantGuid = context.params.restaurantGuid;
        const restaurantRepository = new RestaurantRepository();

        try {
            const tables = await restaurantRepository.getTables(restaurantGuid);
            TableResponses.getTablesResponse(context, tables);
        } catch (err) {
            throw new RegistrationError('registration failed', err);
        }

        await next();
    }
}