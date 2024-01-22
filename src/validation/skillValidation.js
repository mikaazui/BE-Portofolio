import joi from 'joi';
import { isString100, isText} from './mainValidation.js';

const isSkill = joi.object({
    title: isString100.required().label('Title'),
    svg: isText.label('Skill Logo'),
    category: isString100.uppercase().required().label('Category'),
});

export {
    isSkill
}