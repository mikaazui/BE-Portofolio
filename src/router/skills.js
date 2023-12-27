import Express from "express";
import skillsController from "../controller/skillsController.js";
export const routeSkills = Express.Router();

routeSkills.get('/skills/:id', skillsController.get)

routeSkills.post('/skills', skillsController.post)

routeSkills.put('/skills/:id', skillsController.put)

routeSkills.patch('/skills/:id', skillsController.patch)

routeSkills.delete('/skills/:id', skillsController.remove)
