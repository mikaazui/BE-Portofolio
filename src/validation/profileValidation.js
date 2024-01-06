import joi from 'joi';
import { isString100, isText, isYear, isURL } from './mainValidation.js';


const isProfile = joi.object({
    email: isString100.email().required().lowercase().label('Email'),
    firstName: isString100.required().label('Firstname'),
    lastName: isString100.required().label('Lastname'),
    dob: joi.date().less('now').label('DOB'),

    
    //unrequired
    address: isText.trim().label('Address'),
    bio: isText,
    website: isURL,
    instagram: isURL,
    github: isURL,
    linkedin: isURL,
    discord: isURL,
    twitter: isURL

})

export {
    isProfile
}