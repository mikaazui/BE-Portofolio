import joi from 'joi';
import { isString100, isText, isYear, isURL } from './mainValidation.js';

const isSkill = joi.object({
    title: isString100.required(),
    category: isString100.uppercase().required()
});

export {
    isSkill
}