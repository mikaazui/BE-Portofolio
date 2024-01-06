import express from "express";
import projectController from "../controller/projectController.js";
export const routeProject = express.Router();


//separator start project

//create
routeProject.post('/project', projectController.post);


routeProject.route('/project/:id')
    .put(projectController.put)//update
    .delete(projectController.remove)//delete
