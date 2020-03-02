import * as Joi from 'joi';
import mongoose from 'mongoose';

const objectId = Joi.extend((joi: any) => ({
    base: Joi.string(),
    name: 'string',
    language: {
        value: 'Guid must be an ObjectId'
    },
    rules: [
        {
            name: 'mongoDBObjectId',
            validate(params: any, value: any, state: any, options: any) {

                if (!mongoose.Types.ObjectId.isValid(value)) {
                    return this.createError(
                        'string.value',
                        {v: value},
                        state,
                        options
                    );
                }

                return value;
            }
        }
    ]
}));

export const tableGuid: Joi.SchemaMap = {
    tableGuid: objectId.string().mongoDBObjectId().required()
};

export const restaurantGuid: Joi.SchemaMap = {
    restaurantGuid: objectId.string().mongoDBObjectId().required()
};

export const reservationGuid: Joi.SchemaMap = {
    reservationGuid: objectId.string().mongoDBObjectId().required()
};