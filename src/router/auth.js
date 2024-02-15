import express from 'express';
import authController from '../controller/authController.js';
export const routeAuth = express.Router();

//separator start logout
routeAuth.delete('/logout', authController.logout)

//get data user
routeAuth.get('/user', authController.getUser)
