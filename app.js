import express from "express";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    // res.send('<p>Hello World</p>')

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
    // res.send('<p>Hello About</p>')

    res.cookie('token', '12345').send('<p>Hello About</p>')

  })

app.get('/project', (req, res) => {
    // res.send('<p>Hello Project</p>')
  
  })

app.get('/blog', (req, res) => {
    res.send('<p>Hello Blog</p>')
  })





app.listen(5000, () => {
    console.log("server running on http://localhost:5000");
})
