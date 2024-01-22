import joi from 'joi';
import { isString100, isText, isURL, isString25 } from './mainValidation.js';

const isProfile = joi.object({
    email: isString100.email().required().lowercase().label('Email'),
    firstName: isString100.required().label('Firstname'),
    lastName: isString100.required().label('Lastname'),
    dob: joi.date().less('now').label('DOB'),
    //unrequired
    city: isString100.label('City') ,     
    country:isString100.label('Country') ,  
    job:isString100.label('Job') ,      
    phone: isString25.label('Phone'),   
    address: isText.trim().label('Address'),
    bio: isText.label('Bio'),
    website: isURLlabel('Website'),
    instagram: isURLlabel('Instagram'),
    github: isURLlabel('Github'),
    linkedin: isURLlabel('Linkedin'),
    discord: isURLlabel('Discord'),
    twitter: isURLlabel('Twitter'),

})

export {
    isProfile
}
