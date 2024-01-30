import express, { Router } from "express";
import blogController from "../controller/blogController.js";
import multer from 'multer';
export const routeBlog = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        //random rumber w date generator
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        //create file ext
        const ext = file.originalname.split('.').pop()
        //final merge 
        cb(null, `${file.fieldname}-${uniqueSuffix}.${ext}`)
        //cara kedua, pilih sesuai selera

        // cb(null, file.fieldname + '-' + uniqueSuffix + '.' + ext)
    }
})

const upload = multer({ storage: storage })
//semua route butuh check auth
//create blog + photo
routeBlog.post('/blog', upload.array('photos', 10), blogController.post);//create blog
//update blog + photo
routeBlog.put('/blog/:id', upload.array('photos', 10), blogController.put);//update blog
//patch update sebagian
routeBlog.patch('/update_blog_title/:id', blogController.updateBlogTitle);
//delete
routeBlog.delete('/blog/:id', blogController.remove) //delete by id
