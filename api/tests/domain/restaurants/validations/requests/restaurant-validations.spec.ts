import * as chai from 'chai';
import * as Joi from 'joi';
import * as validations from '../../../../../src/domain/restaurants/validations/requests/restaurant-validations';

describe('Test custom validation from restaurants', () => {
    it('Should accept the times', async () => {
        const dates = [
            '06:00 PM',
            '06:00 AM',
            '06:00 pm',
            '06:00 am',
            '10:00 am',
            '10:00am',
            '10:00pm',
        ];

        for (const date of dates) {
            const input = {
                name: '123',
                opensAt: date,
                closesAt: date
            };

            const valResult = Joi.validate(input, { ...validations.createRestaurants }, {
                allowUnknown: true,
                abortEarly: false
            });

            chai.expect(valResult.error).to.be.null;
        }
    });

    it('Should return error related to the not valid times', async () => {

        const dates = [
            '06:010 PM',
            '060:01 PM',
            '060:01 M',
            '060:01',
            '0:01',
            '00:01',
        ];

        for (const date of dates) {
            const input = {
                name: '123',
                opensAt: date,
                closesAt: date
            };

            const valResult = Joi.validate(input, { ...validations.createRestaurants }, {
                allowUnknown: true,
                abortEarly: false
            });

            chai.expect(valResult.error).to.be.not.null;
        }
    });
});
