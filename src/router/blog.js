import express, { Router } from "express";
import blogController from "../controller/blogController.js";
export const routeBlog = express.Router();

// routeBlog.route('/blog')
//     .get(blogController.get)
//     .post(blogController.post)

routeBlog.get('/blogs', blogController.getAll  );
routeBlog.get('/blog/:id', blogController.get);
routeBlog.post('blog', blogController.post);

routeBlog.route('/blog/:id')
    .put(blogController.put)
    .patch(blogController.patch)
    .delete(blogController.remove)
