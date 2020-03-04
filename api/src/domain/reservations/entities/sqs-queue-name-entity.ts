import mongoose, { Schema, Document } from 'mongoose';

export interface ISQSQueueName extends Document {
    name: string;
    when: string;
    restaurantGuid: string;
}
const SQSQueueNameSchema: Schema = new Schema({
    name: { type: String, required: true },
    restaurantGuid: { type: String, required: true },
    when: { type: Date, required: true }
});

export default mongoose.model<ISQSQueueName>('SQSQueueName', SQSQueueNameSchema);