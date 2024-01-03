import joi from 'joi';
import { isString100, isYear } from './mainValidation.js';


const isEducation = joi.object({
    insituitionName: isString100.required().trim().label('Institution Name'),
    degree: isString100.trim().label('Degree'),
    major: isString100.trim().label('Major'),
    city: isString100.trim().label('city'),
    startYear: isYear.label('Start Date'),
    endYear: isYear.label('End Date')
})

export {
    isEducation
}