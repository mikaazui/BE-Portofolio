import express from 'express';
import authController from '../controller/authController.js';
export const routeAuth = express.Router();

//separator start logout
routeAuth.delete('/logout', authController.logout)
