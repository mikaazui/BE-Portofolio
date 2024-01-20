import joi from 'joi';
import { isString100, isText} from './mainValidation.js';

const isSkill = joi.object({
    title: isString100.required(),
    svg: isText,
    category: isString100.uppercase().required()
});

export {
    isSkill
}