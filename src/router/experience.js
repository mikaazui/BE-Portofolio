import express, { Router } from "express";
import experienceController from "../controller/experienceController.js";
export const routeExperience = express.Router();

// routeExperience.route('/blog')
//     .get(blogController.get)
//     .post(blogController.post)

//semua route butuh check auth
routeExperience.post('/experience', experienceController.post); //create post/experience

routeExperience.route('/experience/:id')
    .put(experienceController.put) //update by id
    .delete(experienceController.remove) //delete by id
    