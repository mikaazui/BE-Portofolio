import Express from "express";
import skillController from "../controller/skillController.js";
export const routeSkill = Express.Router();

routeSkill.post('/skill', skillController.post);

routeSkill.route('/skill/:id')
    .put(skillController.put)
    .delete(skillController.remove)
