import express from "express";
import multer from 'multer';
import profileController from "../controller/profileController.js";
export const routeProfile = express.Router();
// const upload = multer({ dest: 'uploads/' })

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
        cb(null,`${file.fieldname}-${uniqueSuffix}.${ext}`)
        //cara kedua, pilih sesuai selera
        
        // cb(null, file.fieldname + '-' + uniqueSuffix + '.' + ext)
    }
})

const upload = multer({ storage: storage })


routeProfile.put('/profile', upload.single('avatar'), profileController.put);//update profile   
