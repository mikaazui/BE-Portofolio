import express from 'express';
import blogController from '../controller/blogController.js';
import { routeAuth } from './auth.js';
import authController from '../controller/authController.js';

export const routerPublic = express.Router();
//login
routeAuth.post('/login', authController.login)

routerPublic.get('/blogs', blogController.getAll); //get all 

routerPublic.get('/blog/:id', blogController.get) //get by id