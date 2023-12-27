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

//start profile

//membaca data (contact)
app.get('/profile/:id', (req, res) => {
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
//membuat data (profile)
app.post('/profile', (req, res) => {
  res.status(200).json({
    id: req.params.id,
    ip: req.ip,
    query: req.query,
    body: req.body,
    path: req.path,
    params: req.params
  })
})
//ubah data keseluruhan (profile)
app.put('/profile/:id', (req, res) => {
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
//untuk mengubah sebagian data (profile)
app.patch('/profile/:id', (req, res) => {
  res.status(200).json({
    id: req.params.id,
    ip: req.ip,
    query: req.query,
    body: req.body,
    path: req.path,
    params: req.params
  })
})
//menghapus data (profile)
app.delete('/profile/:id', (req, res) => {
  res.status(200).json({
    id: req.params.id,
    ip: req.ip,
    body: req.body,
    query: req.query,
    path: req.path,
    params: req.params
  })
})


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
  res.send('<p>Hello Blog</p>')
})
app.post('/blog', (req, res) => {
  res.send('<p>Hello Blog</p>')
})
app.put('/blog/:id', (req, res) => {
  res.send('<p>Hello Blog</p>')
})
app.patch('/blog/:id', (req, res) => {
  res.send('<p>Hello Blog</p>')
})
app.delete('/blog/:id', (req, res) => {
  res.send('<p>Hello Blog</p>')
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
