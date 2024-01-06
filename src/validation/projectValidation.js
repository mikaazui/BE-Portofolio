import joi from 'joi';
import { isString100, isString255, isText, isURL } from './mainValidation.js';
// import { isString100, isYear } from './mainValidation.js';

export const isProject = joi.object({
    title: isString255.required(),
    description: isText,
    startDate: joi.date().less('now').required(),
    endDate: joi.date().less('now'),
    status: joi.string().valid('ON_PROGRESS', 'MAINTENANCE', ' COMPLETED'),
    url: isURL,
    gitHub: isURL,
    company: isString100
})
