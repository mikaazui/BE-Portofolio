import express from "express";
import educationController from "../controller/educationController.js";
export const routeEducation = express.Router();

routeEducation.post('/education', educationController.post);
routeEducation.route('/education/:id')
    .put(educationController.put)
    .delete(educationController.remove)
