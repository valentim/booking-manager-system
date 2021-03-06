import * as Joi from 'joi';

export const addTables: Joi.SchemaMap = {
    positionName: Joi.string().required(),
    maxSeats: Joi.number().min(1).required()
};
