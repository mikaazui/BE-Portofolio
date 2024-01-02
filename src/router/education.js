import express from "express";
import educationController from "../controller/educationController.js";
export const routeEducation = express.Router();


routeEducation.route('/educations', educationController.getAll);

routeEducation.route('/education', educationController.post);

routeEducation.route('/education/:id')
    .put(educationController.put)
    .delete(educationController.remove)
