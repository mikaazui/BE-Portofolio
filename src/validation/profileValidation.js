import joi from 'joi';
import { isString100, isYear } from './mainValidation.js';


const isProfile = joi.object({
    email: isString100.email().required().lowercase().label('Email'),
    firstName: isString100.required().label('Firstname'),
    lastName: isString100.required().label('Lastname'),
    dob: joi.date().less('now').label('DOB'),

    
    //unrequired
    address: isString100.trim().label('Address'),
    bio: isString100.trim().label('Bio'),
    website: isString100.trim().label('Website'),
    instagram: isString100.trim().label('Instagram'),
    github: isString100.trim().label('Github'),
    linkedin: isString100.trim().label('Linkedin'),
    discord: isString100.trim().label('Discord'),
    twitter: isString100.trim().label('Twitter'),

})

export {
    isProfile
}