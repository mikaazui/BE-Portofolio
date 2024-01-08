import express from 'express';
import blogController from '../controller/blogController.js';
import authController from '../controller/authController.js';
import educationController from '../controller/educationController.js';
import profileController from '../controller/profileController.js';
import projectController from '../controller/projectController.js';
import skillController from '../controller/skillController.js';

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
routerPublic.get('/profile', profileController.get) //get profile by id


//project

routerPublic.get('/projects', projectController.getAll)//get all
routerPublic.get('/project', projectController.get)//get by id

//skill
routerPublic.get('/skills', skillController.getAll)//get all
routerPublic.get('/skill/:id', skillController.get)//get by id
