import { Connection } from './connection';

export class Producer {
    private connection: Connection;

    constructor(connection: Connection) {
        this.connection = connection;
    }

    public async send(payload: any) {
        const queue = `${this.connection.QueueUrl}${payload.queueName}`;
        this.connection.Client.createQueue({
            QueueName: payload.queueName,
            Attributes: {
                DelaySeconds: '0',
                VisibilityTimeout: '30',
                MessageRetentionPeriod: '86400',
                FifoQueue: 'true',
                ContentBasedDeduplication: 'true'
            }
        }, (err, data) => {
            if (err) {
                console.log(err);
            }

            this.connection.Client.sendMessage({
                MessageGroupId: 'api1',
                MessageBody: JSON.stringify(payload.message),
                QueueUrl: queue
            }, (err, data) => {
                if (err) {
                    console.log(err);
                }
            });
        });
    }
}