import express from 'express';
import authController from '../controller/authController.js';
export const routeAuth = express.Router();

routeAuth.post('/login', authController.post)
//separator start logout
routeAuth.delete('/logout', authController.remove)
