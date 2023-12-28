import express from "express";
import educationController from "../controller/educationController.js";
export const routeEducation = express.Router();

routeEducation.route('/education')
    .get(educationController.get)
    .post(educationController.post)

routeEducation.route('/education/:id')
    .put(educationController.put)
    .patch(educationController.patch)
    .delete(educationController.remove)
