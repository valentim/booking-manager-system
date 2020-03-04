import mongoose, { Schema, Document } from 'mongoose';

export interface IReservation extends Document {
    user: string;
    tableGuid: string;
    restaurantGuid: string;
    seats: number;
    restaurantName?: string;
    tableName?: string;
    when: string;
}
const ReservationSchema: Schema = new Schema({
    user: { type: String, required: true },
    tableGuid: { type: String, required: true },
    restaurantGuid: { type: String, required: true },
    seats: {type: Number, required: true },
    when: { type: Date, required: true }
});

ReservationSchema.index({ when: 1, restaurantGuid: 1, tableGuid: 1}, { unique: true });

export default mongoose.model<IReservation>('Reservation', ReservationSchema);