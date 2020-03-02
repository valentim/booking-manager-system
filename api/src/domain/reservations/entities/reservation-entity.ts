import mongoose, { Schema, Document } from 'mongoose';

export interface IReservation extends Document {
    user: string;
    tableGuid: string;
    restaurantGuid: string;
    restaurantName?: string;
    tableName?: string;
    canceledAt: Date;
    when: string;
}
const ReservationSchema: Schema = new Schema({
    user: { type: String, required: true },
    tableGuid: { type: String, required: true },
    restaurantGuid: { type: String, required: true },
    when: { type: Date, required: true, unique: true },
    canceledAt: { type: Date },
});

export default mongoose.model<IReservation>('Reservation', ReservationSchema);