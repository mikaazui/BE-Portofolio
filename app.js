import express from "express";
import cookieParser from "cookie-parser";
import { routeProfile } from "./src/router/profile.js";
import { routeProject } from "./src/router/project.js";
import { routeEducation } from "./src/router/education.js";
import { routeBlog } from "./src/router/blog.js";
import { routeSkills } from "./src/router/skills.js";
import { routeAuth } from "./src/router/auth.js";
import { logging } from "./src/middleware/logging.js";
import { routeUnknown } from "./src/middleware/unknown.js";

const app = express();

app.use(express.json());
app.use(cookieParser());
//middleware untuk collect data dari client
app.use(logging);

app.get('/', (req, res) => {
  res.send('<p>Hello World</p>')
  res.status(200).json({
    message: 'berhasil masuk ke halaman home',
  })
})


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
//separator server run

app.listen(5000, () => {
  console.log("server running on http://localhost:5000");
})
