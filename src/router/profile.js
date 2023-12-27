import express from "express";
import profileController from "../controller/profileController.js";
export const routeProfile = express.Router();

//membaca data (profile)
routeProfile.get('/profile/:id', profileController.get)
//membuat data (profile)
routeProfile.post('/profile', profileController.post)
//ubah data keseluruhan (profile)
routeProfile.put('/profile/:id', profileController.put)
//untuk mengubah sebagian data (profile)
routeProfile.patch('/profile/:id', profileController.patch)
//menghapus data (profile)
routeProfile.delete('/profile/:id', profileController.remove)
