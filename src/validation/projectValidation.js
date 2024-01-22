import joi from 'joi';
import { isString100, isString255, isText, isURL } from './mainValidation.js';

export const isProject = joi.object({
    title: isString255.required().label('Title'),
    description: isText.label('Description'),
    startDate: joi.date().max('now').required().label('Start Date'),
    endDate: joi.date().min(joi.ref('startDate')).less('now').label('End Date'),
    status: joi.string().valid('ON_PROGRESS', 'MAINTENANCE', ' COMPLETED').label('Status'),
    url: isURL.label('URL'),
    gitHub: isURL.label('GitHub'),
    company: isString100.label('Company'),
})
