import express from "express";
export const routeProfile = express.Router();

//membaca data (contact)
routeProfile.get('/profile/:id', (req, res) => {
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
routeProfile.post('/profile', (req, res) => {
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
routeProfile.put('/profile/:id', (req, res) => {
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
routeProfile.patch('/profile/:id', (req, res) => {
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
routeProfile.delete('/profile/:id', (req, res) => {
  res.status(200).json({
    id: req.params.id,
    ip: req.ip,
    body: req.body,
    query: req.query,
    path: req.path,
    params: req.params
  })
})
