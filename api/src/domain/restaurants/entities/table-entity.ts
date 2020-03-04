import mongoose, { Schema, Document } from 'mongoose';

export interface ITable extends Document {
    positionName: string;
    maxSeats: number;
}

export const TableSchema: Schema = new Schema({
    positionName: { type: String, required: true },
    maxSeats: { type: Number, required: true },
});

export default mongoose.model<ITable>('Table', TableSchema);