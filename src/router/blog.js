import express, { Router } from "express";
import blogController from "../controller/blogController.js";
import fileService from "../services/fileService.js";
export const routeBlog = express.Router();

//semua route butuh check auth
//create blog + photo
routeBlog.post('/blog', fileService.upload.array('photos', 10), blogController.post);//create blog
//update blog + photo
routeBlog.put('/blog/:id',  fileService.upload.array('photos', 10), blogController.put);//update blog
//patch update sebagian
routeBlog.patch('/update_blog_title/:id', blogController.updateBlogTitle);
//delete
routeBlog.delete('/blog/:id', blogController.remove) //delete by id
