import joi from 'joi';

const isID = joi.number().min(1).positive().label("id").required();
const isString100 = joi.string().min(3).max(100)
const isString255 = joi.string().min(3).max(255)
const isYear = joi.number().positive()

export {
    isID,
    isString100,
    isString255,
    isYear
}