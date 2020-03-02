import mongoose from 'mongoose';

export class MongoDB {
    connect(db: string) {
        mongoose
            .connect(db, { useNewUrlParser: true , useCreateIndex: true, useUnifiedTopology: true, autoIndex: true })
            .then(() => {
                return console.info(`Successfully connected to ${db}`);
            })
            .catch(error => {
                console.error('Error connecting to database: ', error);
                return process.exit(1);
            });
    }
}