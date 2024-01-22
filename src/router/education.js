import express from "express";
import educationController from "../controller/educationController.js";
export const routeEducation = express.Router();
// FIXME jgn terlalu banyak baris kosong



routeEducation.post('/education', educationController.post);

routeEducation.route('/education/:id')
    .put(educationController.put)
    .delete(educationController.remove)
