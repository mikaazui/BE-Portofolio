import express from "express";
import educationController from "../controller/educationController.js";
export const routeEducation = express.Router();

routeEducation.get('/education/:id', educationController.get)

routeEducation.post('/education', educationController.post)

routeEducation.put('/education/:id', educationController.put)

routeEducation.patch('/education/:id', educationController.patch)

routeEducation.delete('/education/:id', educationController.remove)
