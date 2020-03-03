import { SQS } from 'aws-sdk';

export class Connection {
    private newClient: SQS;

    constructor(config: any) {
        this.newClient = new SQS(config);
    }

    public get Client(): SQS {
        return this.newClient;
    }

    public get QueueUrl(): string {
        return 'https://sqs.us-east-1.amazonaws.com/491434249452/';
    }
}