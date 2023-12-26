import express from "express";
import cookieParser from "cookie-parser";

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


//membaca data (contact)
app.get('/contact/:id', (req, res) => {
  // res.send('<p>Hello Contact</p>')
  res.status(200).format({
    json: () => {
      res.send({
        id: req.params.id,
        ip: req.ip,
        query: req.query,
        body: req.body,
        path: req.path,
        params: req.params,
        cookies: req.cookies,
        protocol: req.protocol,

      })
    },
  })


})
//membuat data contact (contact)
app.post('/contact', (req, res) => {
  res.status(200).json({
    id: req.params.id,
    ip: req.ip,
    query: req.query,
    body: req.body,
    path: req.path,
    params: req.params
  })
})
//ubah data keseluruhan (contact)
app.put('/contact/:id', (req, res) => {
  res.status(200).json({
    id: req.params.id,
    ip: req.ip,
    query: req.query,
    body: req.body,
    path: req.path,
    params: req.params
  })

  res.status(200).json({
    id: req.params.id,
    ip: req.ip,
    query: req.query,
    body: req.body,
    path: req.path,
    params: req.params
  })
})
//untuk mengubah sebagian data (contact)
app.patch('/contact:id', (req, res) => {
  res.status(200).json({
    id: req.params.id,
    ip: req.ip,
    query: req.query,
    body: req.body,
    path: req.path,
    params: req.params
  })
})
//menghapus data (contact)
app.delete('/contact/:id', (req, res) => {
  res.status(200).json({
    id: req.params.id,
    ip: req.ip,
    query: req.query,
    body: req.body,
    path: req.path,
    params: req.params
  })
})


//separator


app.get('/project', (req, res) => {
  res.status(200).json({
    message: 'berhasil masuk ke halaman project',
  })

})


// separator

app.get('/blog', (req, res) => {
  res.send('<p>Hello Blog</p>')
})
//separator
app.post('/login', (req, res) => {

  res.cookie('token', '12345')
  res.cookie('name', 'valent')

  res.status(200).json({
    message: 'login success',
  })

})


//separator


app.delete('/logout', (req, res) => {
  res.clearCookie('token')
  res.clearCookie('name')

  res.status(200).json({
    message: 'logout success'
  })
})
//middleware for unknown path
app.use((req, res) => {
  res.status(404).json({
    message: 'page not found'
  })
})


app.listen(5000, () => {
  console.log("server running on http://localhost:5000");
})
