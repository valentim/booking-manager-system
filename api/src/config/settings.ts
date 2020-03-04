import dotenv from 'dotenv';

dotenv.config({path: `${process.cwd()}/.env`});
const settings = {
    aws: {
        accessKeyId: process.env.ACCESS_KEY_ID,
        secretAccessKey: process.env.SECRET_ACCESS_KEY,
        region: process.env.REGION
    },
    mongodb: {
        resource: process.env.MONGODB_RESOURCE
    }
};

export { settings };