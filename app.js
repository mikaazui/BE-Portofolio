import express from "express";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use((req, res, next) => {
  let time = new Date()
  time = time.toLocaleDateString()
  const log = {
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

    res.format({
        json: () => {
          res.json({ message: 'Hello World JSON' })
        }
      })
  })
  
app.get('/contact', (req, res) => {
    // res.send('<p>Hello Contact</p>')
    res.status(200).format({
      json: () => {
        res.send({
          ip: req.ip,
          query: req.query,
          body: req.body,
          path: req.path,
          params: req.params
          
        })
      },
    })


  })

  app.post('/contact', (req, res) => {
    res.send('<p>Hello Contact (post)</p>')
  })

  app.put('/contact/:category', (req, res) => {
    // res.send('<p>Hello Contact (post)</p>')

    res.status(200).format({
      json: () => {
        res.send({
          ip: req.ip,
          query: req.query,
          body: req.body,
          path: req.path,
          params: req.params
          
        })
      },
    })
  })
  
  app.patch('/contact', (req, res) => {
    res.send('<p>Hello Contact (post)</p>')
  })

  app.delete('/contact', (req, res) => {
    res.send('<p>Hello Contact (post)</p>')
  })


app.get('/about', (req, res) => {
  res.status(200).json({
    message: 'berhasil masuk ke halaman about',
  })})

app.get('/project', (req, res) => {
  res.status(200).json({
    message: 'berhasil masuk ke halaman project',
  })
  
  })

app.get('/blog', (req, res) => {
    res.send('<p>Hello Blog</p>')
  })

  app.post('/login', (req, res) => {
    
    res.cookie('token', '12345')
    res.cookie('name', 'valent')

    res.status(200).json({
      message: 'login success',
    })

  } )

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
