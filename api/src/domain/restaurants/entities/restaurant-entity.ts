import mongoose, { Schema, Document } from 'mongoose';
import { ITable, TableSchema } from '../entities/table-entity';

export interface IRestaurant extends Document {
    name: string;
    opensAt: string;
    closesAt: string;
    tables: ITable[];
}
const RestaurantSchema: Schema = new Schema({
    name: { type: String, required: true, unique: true },
    opensAt: { type: String, required: true },
    closesAt: { type: String, required: true },
    tables: [TableSchema]
});

export default mongoose.model<IRestaurant>('Restaurant', RestaurantSchema);