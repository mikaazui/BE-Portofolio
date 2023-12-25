import express from "express";

const app = express();


app.get('/', function (req, res) {
    // res.send('<p>Hello World</p>')

    res.format({
        json: function () {
          res.json({ message: 'Hello World' })
        }
      })
  })
  
app.get('/contact', function (req, res) {
    res.send('<p>Hello Contact</p>')
  })

app.get('/about', function (req, res) {
    res.send('<p>Hello About</p>')
  })

app.get('/project', function (req, res) {
    res.send('<p>Hello Project</p>')
  })

app.get('/blog', function (req, res) {
    res.send('<p>Hello Blog</p>')
  })





app.listen(5000, () => {
    console.log("server running on http://localhost:5000");
})
