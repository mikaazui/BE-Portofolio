import express from "express";
import cookieParser from "cookie-parser";
import dotenv from 'dotenv';
import { routeProfile } from "./src/router/profile.js";
import { routeProject } from "./src/router/project.js";
import { routeEducation } from "./src/router/education.js";
import { routeBlog } from "./src/router/blog.js";
import { routeSkills } from "./src/router/skills.js";
import { routeAuth } from "./src/router/auth.js";
import { logging } from "./src/middleware/logging.js";
import { routeUnknown } from "./src/middleware/unknown.js";
import { ResponseError } from "./src/error/responseError.js";
import Joi from "joi";
import { errorMid } from "./src/middleware/errorMid.js";
import { routerPublic } from "./src/router/public.js";
//deklaraai penggunaan apk express
const app = express();
dotenv.config();

//untuk membaca json dari body
app.use(express.json());
//untuk membaca cookie
app.use(cookieParser());

//middleware untuk collect data dari client
app.use(logging);

//public api
app.use(routerPublic)

//profile
app.use(routeProfile);

//project
app.use(routeProject);

//ducation
app.use(routeEducation);

// separator start blog
app.use(routeBlog);

//separator start skills
app.use(routeSkills);

//separator start Auth
app.use(routeAuth);

//middleware for unknown path and error
app.use(routeUnknown);

//middleware for error   
app.use(errorMid);



//separator server run
const port = process.env.PORT
app.listen(5000, () => {
  console.log("server running on http://localhost:" + port);
})
