import express from 'express';
import blogController from '../controller/blogController.js';
import authController from '../controller/authController.js';
import educationController from '../controller/educationController.js';
import profileController from '../controller/profileController.js';

export const routerPublic = express.Router();
//login
routerPublic.post('/login', authController.login)

//blog
routerPublic.get('/blogs', blogController.getAll); //get all 
routerPublic.get('/blog/:id', blogController.get) //get by id
//education

routerPublic.get('/educations', educationController.getAll);//get all
routerPublic.get('/education/:id', educationController.get);//get by id

//profile
routerPublic.get('/profile', profileController.get) //get profile


//project

//skill
