import joi from 'joi';
import { isString100, isText, isURL, isString25 } from './mainValidation.js';


const isProfile = joi.object({
    email: isString100.email().required().lowercase().label('Email'),
    firstName: isString100.required().label('Firstname'),
    lastName: isString100.required().label('Lastname'),
    dob: joi.date().less('now').label('DOB'),
    //unrequired
    city: isString100.label('city') ,     
    country:isString100.label('country') ,  
    job:isString100.label('job') ,      
    phone: isString25.label('phone'),   
    address: isText.trim().label('address'),
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