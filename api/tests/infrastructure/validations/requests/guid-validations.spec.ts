import * as chai from 'chai';
import * as Joi from 'joi';
import * as validations from '../../../../src/infrastructure/validations/requests/guid-validations';

describe('Test Guid custom validation', () => {
    it('Should accept the guid', async () => {
        const input = {
            reservationGuid: '5e5aa69e21d239a34cee1264'
        };

        const valResult = Joi.validate(input, { ...validations.reservationGuid }, {
            allowUnknown: true,
            abortEarly: false
        });

        chai.expect(valResult.error).to.be.null;
    });

    it('Should return error related to the wrong guid', async () => {

        const input = {
            reservationGuid: '123'
        };

        const valResult = Joi.validate(input, { reservationGuid: validations.reservationGuid }, {
            allowUnknown: true,
            abortEarly: false
        });

        chai.expect(valResult.error).to.be.not.null;
    });
});
