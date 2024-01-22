import joi from 'joi';
import { isString100, isText } from './mainValidation.js';

const isExperience = joi.object({
    company: isString100.required().label('Company'),
    location: isString100.label('Location'),
    title: isString100.required().label('Title'),
    description: isText.required().label('Description'),
    startDate: joi.date().required().max('now').label('Start Date'),
    endDate: joi.date().min(joi.ref('startDate')).less('now').label('End Date'),
});

//ntar tolong ubah descriptionnya ke text ya (dari prismanya)

export {
    isExperience
}