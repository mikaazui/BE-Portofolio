import Joi from 'joi';

const isID = Joi.number().min(1).positive().label("id").required();
const isString25 = Joi.string().max(25).trim()
const isString100 = Joi.string().max(100).trim()
const isString255 = Joi.string().max(255).trim()
const isYear = Joi.number().positive()
const isText = Joi.string().trim().allow(null, '')
const isURL = Joi.string().uri().trim().allow(null, '');

export {
    isID,
    isString25,
    isString100,
    isString255,
    isYear,
    isText,
    isURL
}