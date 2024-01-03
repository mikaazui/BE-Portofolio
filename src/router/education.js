import express from "express";
import educationController from "../controller/educationController.js";
export const routeEducation = express.Router();


routeEducation.get('/educations', educationController.getAll);

routeEducation.post('/education', educationController.post);

routeEducation.route('/education/:id')
    .get(educationController.get)
    .put(educationController.put)
    .delete(educationController.remove)
