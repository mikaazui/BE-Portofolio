import express, { Router } from "express";
import blogController from "../controller/blogController.js";
export const routeBlog = express.Router();

// routeBlog.route('/blog')
//     .get(blogController.get)
//     .post(blogController.post)

//semua route butuh check auth

routeBlog.post('/blog', blogController.post); //create post/blog
routeBlog.patch('/update_blog_title/:id', blogController.updateBlogTitle);

routeBlog.route('/blog/:id')
    .put(blogController.put) //update by id
    .delete(blogController.remove) //delete by id
    