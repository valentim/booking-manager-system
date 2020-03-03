import * as Joi from 'joi';

const reservationRange = Joi.extend((joi: any) => ({
    base: Joi.date().iso(),
    name: 'date',
    language: {
        value: 'The range of reservation must be every one hour. eg. 2020-01-01 10:00:00, 2020-01-02 11:00:00...'
    },
    rules: [
        {
            name: 'period',
            validate(params: any, value: any, state: any, options: any) {
                const regex = /.+([0-1][0-9]|[2][0-3]):00:00.+Z$/gm;
                const newValue = value.toISOString();
                const match = regex.exec(newValue);

                regex.lastIndex = 0;

                if (match === null) {
                    return this.createError(
                        'date.value',
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

export const createReservation: Joi.SchemaMap = {
    user: Joi.string().required(),
    seats: Joi.number().min(1),
    when: reservationRange.date().period().required(),
};