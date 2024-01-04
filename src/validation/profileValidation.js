import joi from 'joi';
import { isString100, isYear } from './mainValidation.js';


const isProfile = joi.object({
    email: isString100.email().required().trim().label('Email'),
    firstName: isString100.trim().required().label('Degree'),
    lastName: isString100.trim().required().label('Major'),
    dob: isYear.label('DOB'),
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