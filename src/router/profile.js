import express from "express";
import profileController from "../controller/profileController.js";
export const routeProfile = express.Router();

routeProfile.route('/profile')
    .get(profileController.get)
    .post(profileController.post);


routeProfile.route('/profile/:id')
    .put(profileController.put)
    .patch(profileController.patch)
    .delete(profileController.remove);

