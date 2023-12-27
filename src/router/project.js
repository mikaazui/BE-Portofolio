import express from "express";
import projectController from "../controller/projectController.js";
export const routeProject = express.Router();


//separator start project


routeProject.get('/project', projectController.get)

routeProject.post('/project', projectController.post)

routeProject.put('/project', projectController.put)

routeProject.patch('/project', projectController.patch)

routeProject.delete('/project', projectController.remove)
