import Express from "express";
import skillsController from "../controller/skillsController.js";
export const routeSkills = Express.Router();

routeSkills.route('/skills')
    .get(skillsController.get)
    .post(skillsController.post)

routeSkills.route('/skills/:id')
    .put(skillsController.put)
    .patch(skillsController.patch)
    .delete(skillsController.remove)
