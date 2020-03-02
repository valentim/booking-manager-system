"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
class MongoDB {
    connect(db) {
        mongoose_1.default
            .connect(db, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, autoIndex: true })
            .then(() => {
            return console.info(`Successfully connected to ${db}`);
        })
            .catch(error => {
            console.error('Error connecting to database: ', error);
            return process.exit(1);
        });
    }
}
exports.MongoDB = MongoDB;
//# sourceMappingURL=mongodb.js.map