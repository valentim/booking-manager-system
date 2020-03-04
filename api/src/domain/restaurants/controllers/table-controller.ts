import { Context, Next } from 'koa';
import { RestaurantRepository } from '../repositories/restaurant-repository';
import { RegistrationError } from '../../../infrastructure/databases/nosql/errors/registration-errors';
import { ITable } from '../entities/table-entity';
import { TableResponses } from '../responses/table-responses';
import { RegistrationCustomErrors } from '../errors/registration-custom-errors';
import { ReservationRepository } from '../../../domain/reservations/repositories/reservation-repository';
import { Reservoir } from '../../../domain/reservations/services/reservoir';

export class TableController {
    public async create(context: Context, next: Next) {
        const table = context.request.body as ITable;
        const restaurantGuid = context.params.restaurantGuid;
        const restaurantRepository = new RestaurantRepository();

        try {
            const registeredTable = await restaurantRepository.addTable(restaurantGuid, table);


            const reservationRepository = new ReservationRepository();
            const reservoir = new Reservoir(reservationRepository, restaurantRepository);
            reservoir.reserveFromRestaurantQueue(restaurantGuid, registeredTable._id, context.sqsConsumer).catch((err) => {
                console.log(err);
            });

            TableResponses.getSuccessResponse(context, registeredTable, 201);
        } catch (err) {
            throw new RegistrationError('registration failed', new RegistrationCustomErrors(err));
        }

        await next();
    }

    public async update(context: Context, next: Next) {
        const restaurantGuid = context.params.restaurantGuid;
        const tableGuid = context.params.tableGuid;
        const table = context.request.body as ITable;

        const restaurantRepository = new RestaurantRepository();

        try {
            const updateTable = await restaurantRepository.updateTable(table, tableGuid);
            TableResponses.getSuccessResponse(context, updateTable, 200);
        } catch (err) {
            throw new RegistrationError('update failed', err);
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
            throw new RegistrationError('list tables failed', err);
        }

        await next();
    }
}