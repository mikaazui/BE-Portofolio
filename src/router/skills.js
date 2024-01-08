import Express from "express";
import skillsController from "../controller/skillsController.js";
export const routeSkills = Express.Router();

routeSkills.post('/skill', skillsController.post);

routeSkills.route('/skill/:id')
    .put(skillsController.put)
    .patch(skillsController.patch)
    .delete(skillsController.remove)
