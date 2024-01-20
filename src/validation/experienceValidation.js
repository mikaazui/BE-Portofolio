import joi from 'joi';
import { isString100 } from './mainValidation.js';

const isExperience = joi.object({
    company: isString100.required(),
    location: isString100,
    title: isString100.required(),
    description: isString100.required(),
    startDate: joi.date().required(),
    endDate: joi.date().min(joi.ref('startDate')).less('now')
});

//ntar tolong ubah descriptionnya ke text ya (dari prismanya)

export {
    isExperience
}