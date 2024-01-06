import express from "express";
import profileController from "../controller/profileController.js";
export const routeProfile = express.Router();

routeProfile.put('/profile', profileController.put);//update profile   
