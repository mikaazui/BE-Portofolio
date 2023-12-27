import express from "express";
import cookieParser from "cookie-parser";
import {routeProfile}  from "./src/router/profile.js";

const app = express();

app.use(express.json());
app.use(cookieParser());
//middleware untuk collect data dari client
app.use((req, res, next) => {
  let time = new Date()
  time = time.toLocaleDateString()
  const log = {
    id: req.params,
    time: time,
    path: req.path,
    method: req.method,
    ip: req.ip,
    query: req.query,
    body: req.body,
    params: req.params,
    cookies: req.cookies,
    protocol: req.protocol,

  }
  console.info(log)

  next()
})

app.get('/', (req, res) => {
  res.send('<p>Hello World</p>')
  res.status(200).json({
    message: 'berhasil masuk ke halaman home',
  })
})


//separator

app.use(routeProfile);


//separator start project


app.get('/project', (req, res) => {
  res.status(200).json({
    message: 'berhasil masuk ke halaman project',
  })

})
app.post('/project', (req, res) => {
  res.status(200).json({
    message: 'berhasil masuk ke halaman project',
  })

})
app.put('/project', (req, res) => {
  res.status(200).json({
    message: 'berhasil masuk ke halaman project',
  })

})
app.patch('/project', (req, res) => {
  res.status(200).json({
    message: 'berhasil masuk ke halaman project',
  })

})
app.delete('/project', (req, res) => {
  res.status(200).json({
    message: 'berhasil masuk ke halaman project',
  })

})


//separator start education


app.get('/education/:id', (req, res) => {
  res.status(200).json({
    message: 'berhasil masuk ke halaman education',
  })

})
app.post('/education', (req, res) => {
  res.status(200).json({
    message: 'berhasil masuk ke halaman education',
  })

})
app.put('/education/:id', (req, res) => {
  res.status(200).json({
    message: 'berhasil masuk ke halaman education',
  })

})
app.patch('/education/:id', (req, res) => {
  res.status(200).json({
    message: 'berhasil masuk ke halaman education',
  })

})
app.delete('/education/:id', (req, res) => {
  res.status(200).json({
    message: 'berhasil masuk ke halaman education',
  })

})


// separator start blog


app.get('/blog/:id', (req, res) => {
  res.status(200).json({
    message: 'berhasil masuk ke halaman blog',
  })

})
app.post('/blog', (req, res) => {
  res.status(200).json({
    message: 'berhasil masuk ke halaman blog',
  })

})
app.put('/blog/:id', (req, res) => {
  res.status(200).json({
    message: 'berhasil masuk ke halaman blog',
  })

})
app.patch('/blog/:id', (req, res) => {
  res.status(200).json({
    message: 'berhasil masuk ke halaman blog',
  })

})
app.delete('/blog/:id', (req, res) => {
  res.status(200).json({
    message: 'berhasil masuk ke halaman blog',
  })

})


//separator start skills


app.get('/skills/:id', (req, res) => {
  res.status(200).json({
    message: 'berhasil masuk ke halaman skills',
  })

})
app.post('/skills', (req, res) => {
  res.status(200).json({
    message: 'berhasil masuk ke halaman skills',
  })

})
app.put('/skills/:id', (req, res) => {
  res.status(200).json({
    message: 'berhasil masuk ke halaman skills',
  })

})
app.patch('/skills/:id', (req, res) => {
  res.status(200).json({
    message: 'berhasil masuk ke halaman skills',
  })

})
app.delete('/skills/:id', (req, res) => {
  res.status(200).json({
    message: 'berhasil masuk ke halaman skills',
  })

})


//separator start login

app.post('/login', (req, res) => {

  res.cookie('token', '12345')
  res.cookie('name', 'valent')

  res.status(200).json({
    message: 'login success',
  })

})


//separator start logout


app.delete('/logout', (req, res) => {
  res.clearCookie('token')
  res.clearCookie('name')

  res.status(200).json({
    message: 'logout success'
  })
})
//middleware for unknown path and error

app.use((req, res) => {
  res.status(404).json({
    message: 'page not found'
  })
})

//separator server run

app.listen(5000, () => {
  console.log("server running on http://localhost:5000");
})
