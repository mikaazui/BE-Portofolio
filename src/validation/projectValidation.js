import Joi from 'joi';
import { isString100, isString255, isText, isURL } from './mainValidation.js';

export const isProject = Joi.object({
    title: isString255.required(),
    description: isText.required(),
    startDate: Joi.date().less('now').required(),
    endDate: Joi.date().less('now').allow(''),
    status: Joi.string().valid('ON_PROGRESS', 'MAINTENANCE', 'COMPLETE'),
    url: isURL.allow(null, ''),
    github: isURL.allow(null, ''),
    company: isString100.allow(null, ''),
    photos: Joi.array().items(Joi.number()), // kumpulan id [1,2,3]
    skills: Joi.array().items(Joi.number())
})
