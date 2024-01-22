import joi from 'joi';
import { isString100, isText } from './mainValidation.js';

const isExperience = joi.object({
    company: isString100.required(),
    location: isString100,
    title: isString100.required(),
    description: isText.required(),
    startDate: joi.date().required().max('now'),
    endDate: joi.date().min(joi.ref('startDate')).less('now')
});

//ntar tolong ubah descriptionnya ke text ya (dari prismanya)

export {
    isExperience
}