import express from "express";
import cookieParser from "cookie-parser";
import dotenv from 'dotenv';
import { routeProfile } from "./src/router/profile.js";
import { routerPublic } from "./src/router/public.js";
import { routeProject } from "./src/router/project.js";
import { routeEducation } from "./src/router/education.js";
import { routeBlog } from "./src/router/blog.js";
import { routeSkills } from "./src/router/skills.js";
import { routeAuth } from "./src/router/auth.js";
import { logging } from "./src/middleware/logging.js";
import { routeUnknown } from "./src/middleware/unknown.js";
import { errorMid } from "./src/middleware/errorMid.js";
import { Prisma } from "./src/application/prisma.js";
import jwt from 'jsonwebtoken'
//deklaraai penggunaan apk express
const app = express();
dotenv.config();

//untuk membaca json dari body
app.use(express.json());
//untuk membaca cookie
app.use(cookieParser());

//middleware untuk collect data dari client
app.use(logging);

app.use(routerPublic)
//taruh paling atas
//public api


app.use(async (req, res, next) => {
  try {

    console.log('enter routeBlog middleware ==========')
    //check cookie 
    const token = req.cookies.token;
    console.log(token)
    if (!token) {
      return res.status(401).json({
        message: 'Unauthorized'
      })
    }
    ///check siapa pemilik token 
    const user = await Prisma.user.findFirst({
      where: {
        token: token
      },
      select: {
        name: true,
        email: true
      }
    });
    console.log('==============')
    console.log(user)

    if (!user) {
      res.clearCookie('token')
      throw new error()
    }

    //check cookie token valid || no
    const jwtSecretToken = 'SECRET_TOKEN_VAL';
    jwt.verify(token, jwtSecretToken);
    //perbarui token
    const maxAge = 60 * 60
    var newToken = jwt.sign({ email: user.email }, jwtSecretToken, {
      expiresIn: maxAge
    });

   await Prisma.user.update({
      where: {
          email: user.email
      },
      data: {
          token: newToken
      }
  });

    //kirim cookie
    res.cookie('token', newToken) 
    //kalo ok ? next 
    next()
  } catch (error) {
    next(error)


  }
})


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
app.use(routeSkills);

//middleware for unknown path and error
app.use(routeUnknown);

//middleware for error   
app.use(errorMid);



//separator server run
const port = process.env.PORT
app.listen(5000, () => {
  console.log("server running on http://localhost:" + port);
});
