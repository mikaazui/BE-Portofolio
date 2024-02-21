import joi from 'joi';

const isID = joi.number().min(1).positive().label("id").required();
const isString25 = joi.string().max(25).trim()
const isString100 = joi.string().max(100).trim()
const isString255 = joi.string().max(255).trim()
const isYear = joi.number().positive()
const isText = joi.string().trim().allow(null, '')
const isURL = joi.string().uri().trim().allow(null, '');

export {
    isID,
    isString25,
    isString100,
    isString255,
    isYear,
    isText,
    isURL
}