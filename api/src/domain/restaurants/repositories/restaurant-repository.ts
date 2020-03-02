import RestaurantEntity, { IRestaurant } from '../entities/restaurant-entity';
import { ITable } from '../entities/table-entity';

export class RestaurantRepository {
    public async save(newRestaurant: IRestaurant): Promise<IRestaurant> {
        return await RestaurantEntity.create(newRestaurant);
    }

    public async getRestaurantAndTable(restaurantGuid: string, tableGuid: string): Promise<IRestaurant> {
        const restaurant = await RestaurantEntity.findOne(
            { _id: restaurantGuid, 'tables._id':  tableGuid}, { 'tables.$': 1, opensAt: 1, closesAt: 1, name: 1 }
        );

        return restaurant;
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
            throw { code: 11000 };
        }

        restaurant.tables.push(newTable);

        const updatedRestaurant = await restaurant.save();

        return updatedRestaurant.tables.find((t: ITable) => t.positionName === newTable.positionName);
    }
}