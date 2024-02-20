import express from "express";
import cookieParser from "cookie-parser";
import dotenv from 'dotenv';
import { routeProfile } from "./src/router/profile.js";
import { routerPublic } from "./src/router/public.js";
import { routeProject } from "./src/router/project.js";
import { routeEducation } from "./src/router/education.js";
import { routeBlog } from "./src/router/blog.js";
import { routeSkill } from "./src/router/skill.js";
import { routeAuth } from "./src/router/auth.js";
import { logging } from "./src/middleware/logging.js";
import { routeUnknown } from "./src/middleware/unknown.js";
import { errorMid } from "./src/middleware/errorMid.js";
import { authMiddleware } from "./src/middleware/authMiddleware.js";
import { routeExperience } from "./src/router/experience.js";
import fileService from "./src/services/fileService.js";
import fs from 'fs/promises';
import cors from 'cors';
//deklaraai penggunaan apk express
const app = express();
dotenv.config();

//untuk membaca json dari body
app.use(express.json());
//untuk membaca cookie
app.use(cookieParser());

//middleware untuk collect data dari client
app.use(logging);

//create folder upload
fileService.createFolder('./uploads');
//create handle cors
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

//set static files
app.use('/uploads', express.static('./uploads'));
//handle not found file
app.use('/uploads', async (req, res) => {
  try {
    await fs.access('./uploads' + req.url)
    
  } catch (error) {
    res.status(404).json({
      message: 'file not found'
    });
  };

});

//taruh paling atas
//public api
app.use(routerPublic);

app.use(authMiddleware);

// router dibawah akan dicek authnya
//separator start Auth
app.use(routeAuth);

//profile
app.use(routeProfile);

//project
app.use(routeProject);

//ducation
app.use(routeEducation);

// separator start blog
app.use(routeBlog);

//separator start skills
app.use(routeSkill);
//separator start experience
app.use(routeExperience);

//middleware for unknown path and error
app.use(routeUnknown);

//middleware for error   
app.use(errorMid);

//separator server run
const port = process.env.PORT
app.listen(5000, () => {
  console.log("server running on http://localhost:" + port);
});
