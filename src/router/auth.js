import express from 'express';
import authController from '../controller/authController.js';
export const routeAuth = express.Router();

routeAuth.post('/login', authController.login)
//separator start logout
routeAuth.delete('/logout', authController.logout)
