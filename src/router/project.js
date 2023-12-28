import express from "express";
import projectController from "../controller/projectController.js";
export const routeProject = express.Router();


//separator start project


routeProject.route('/project')
    .get(projectController.get)
    .post(projectController.post);


routeProject.route('/project/:id')
    .put(projectController.put)
    .patch(projectController.patch)
    .delete(projectController.remove)
