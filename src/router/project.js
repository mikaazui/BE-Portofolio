import express from "express";
import projectController from "../controller/projectController.js";
import fileService from "../services/fileService.js";
export const routeProject = express.Router();


//separator start project

routeProject.post('/project', fileService.upload.array('photos', 10), projectController.post);//create blog
//update blog + photo
routeProject.put('/project/:id',  fileService.upload.array('photos', 10), projectController.put);//update blog



routeProject.route('/project/:id')
    .put(projectController.put)//update
    .delete(projectController.remove)//delete
