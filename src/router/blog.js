import express, { Router } from "express";
import blogController from "../controller/blogController.js";
export const routeBlog = express.Router();

// routeBlog.route('/blog')
//     .get(blogController.get)
//     .post(blogController.post)

routeBlog.get('/blogs', blogController.getAll); //get all 

routeBlog.post('/blog', blogController.post); //create post/blog

routeBlog.route('/blog/:id')
    .get(blogController.get) //get by id
    .put(blogController.put) //update by id
    .delete(blogController.remove) //delete by id

routeBlog.patch('/update_blog_title/:id', blogController.updateBlogTitle);