import RestaurantEntity, { IRestaurant } from '../entities/restaurant-entity';
import { ITable } from '../entities/table-entity';
import moment from 'moment';

export class RestaurantRepository {
    public async save(newRestaurant: IRestaurant): Promise<IRestaurant> {
        const open = moment(newRestaurant.opensAt, 'HH:mm A');
        const close = moment(newRestaurant.closesAt, 'HH:mm A');

        if (newRestaurant.opensAt == newRestaurant.closesAt) {
            throw { code: 90001 };
        }

        if (open > close) {
            throw { code: 90002 };
        }

        return await RestaurantEntity.create(newRestaurant);
    }

    public async getRestaurantAndTable(restaurantGuid: string, tableGuid: string): Promise<IRestaurant> {
        const restaurant = await RestaurantEntity.findOne(
            { _id: restaurantGuid, 'tables._id':  tableGuid}, { 'tables.$': 1, opensAt: 1, closesAt: 1, name: 1 }
        );

        return restaurant;
    }

    public async updateTable(table: ITable, tableGuid: string): Promise<ITable> {
        const restaurant = await RestaurantEntity.findOneAndUpdate(
            { 'tables._id':  tableGuid},
            {
                '$set': {
                    'tables.$.maxSeats': table.maxSeats,
                    'tables.$.positionName': table.positionName
                }
            },
            {
                new: true
            }
        );

        return restaurant.tables[0];
    }

    public async getTables(restaurantGuid: string): Promise<ITable[]> {
        const restaurant = await RestaurantEntity.findOne(
            { _id: restaurantGuid }, { tables: 1 }
        );

        if (!restaurant) {
            throw { code: 90000 };
        }

        return restaurant.tables;
    }

    public async list(): Promise<IRestaurant[]> {
        return await RestaurantEntity.find();
    }

    public async addTable(restaurantGuid: string, newTable: ITable): Promise<ITable> {
        const restaurant = await RestaurantEntity.findById(restaurantGuid);

        if (!restaurant) {
            throw { code: 90000 };
        }

        if (restaurant.tables.find((t: ITable) => t.positionName === newTable.positionName)) {
            throw { code: 11001 };
        }

        restaurant.tables.push(newTable);

        const updatedRestaurant = await restaurant.save();

        return updatedRestaurant.tables.find((t: ITable) => t.positionName === newTable.positionName);
    }
}