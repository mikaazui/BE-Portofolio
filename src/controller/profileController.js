const get = (req, res) => {
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


}

const post = (req, res) => {
    res.status(200).json({
        id: req.params.id,
        ip: req.ip,
        query: req.query,
        body: req.body,
        path: req.path,
        params: req.params
    })
}

const put = (req, res) => {
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
}

const patch = (req, res) => {
    res.status(200).json({
        id: req.params.id,
        ip: req.ip,
        query: req.query,
        body: req.body,
        path: req.path,
        params: req.params
    })
}

const remove = (req, res) => {
    res.status(200).json({
        id: req.params.id,
        ip: req.ip,
        body: req.body,
        query: req.query,
        path: req.path,
        params: req.params
    })
}

export default {
    get,
    post,
    put,
    patch,
    remove
}