import express from "express";
import blogController from "../controller/blogController.js";
export const routeBlog = express.Router();

routeBlog.get('/blog/:id', blogController.get)

routeBlog.post('/blog', blogController.post)

routeBlog.put('/blog/:id', blogController.put)

routeBlog.patch('/blog/:id', blogController.patch)

routeBlog.delete('/blog/:id', blogController.remove)
