import Joi from 'joi';
import { isString100, isYear } from './mainValidation.js';


const isEducation = Joi.object({
    insituitionName: isString100.required().trim().label('Insituition Name'),
    degree: isString100.trim().label('Degree'),
    major: isString100.trim().allow('').label('Major'),
    city: isString100.trim().label('City'),
    startYear: Joi.date().label('Start Date'),
    endYear: Joi.date().allow(null, "").label('End Date')
})

export {
    isEducation
}
// things that should be filled
// {
//     "insituitionName": "bodong school",
//     "degree": "no degree",
//     "city": "florida",
//     "major": "computer science",
//     "startYear": 2008,
//     "endYear": 2020
// }