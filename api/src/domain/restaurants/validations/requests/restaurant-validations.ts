import * as Joi from 'joi';

const timeOfTheDay = Joi.extend((joi: any) => ({
    base: Joi.string(),
    name: 'string',
    language: {
        value: 'The time format needs to be HH:MM PM|AM eg. 01:00 PM / 01:00 AM'
    },
    rules: [
        {
            name: 'rules',
            validate(params: any, value: any, state: any, options: any) {

                const regex = /^(([0-1][0-2]|0[0-9]):[0-5][0-9])\s?(PM|AM)$/gmi;
                const match = regex.exec(value);
                if (match === null) {
                    return this.createError(
                        'string.value',
                        {v: value},
                        state,
                        options
                    );
                }

                return `${match[1]} ${match[3]}`;
            }
        }
    ]
}));

export const createRestaurants: Joi.SchemaMap = {
    name: Joi.string().required(),
    opensAt: timeOfTheDay.string().rules(),
    closesAt: timeOfTheDay.string().rules()
};
