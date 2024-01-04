import express from 'express';
import blogController from '../controller/blogController';

export const routerPublic = express.Router();

routerPublic.get('/blogs', blogController.getAll); //get all 

routerPublic.get('/blog/:id', blogController.get) //get by id