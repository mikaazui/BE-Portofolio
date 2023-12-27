const logging = (req, res, next) => {
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
  }

  export{logging}