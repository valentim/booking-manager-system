import { Connection } from './connection';

export class Consumer {
    private connection: Connection;

    constructor(connection: Connection) {
        this.connection = connection;
    }

    public async consume(payload: any, quantity: number = 1) {
        const queue = `${this.connection.QueueUrl}${payload.queueName}`;

        return new Promise((resolve, reject) => {
            this.connection.Client.receiveMessage({
                MaxNumberOfMessages: quantity,
                QueueUrl: queue
            }, (err, data) => {
                    if (err) {
                        reject(err);
                    }

                    if (data && 'Messages' in data) {

                        const message = data.Messages[0];

                        const deleteParams = {
                            QueueUrl: queue,
                            ReceiptHandle: message.ReceiptHandle
                        };

                        this.connection.Client.deleteMessage(deleteParams, (err, data) => {
                            if (err) {
                                reject(err);
                            }
                            resolve(JSON.parse(message.Body));
                        });
                        return;
                    }

                    resolve();
            });
        });
    }
}