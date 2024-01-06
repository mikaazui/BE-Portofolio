const get = (req, res) => {
    res.status(200).json({
        message: "berhasil dapet data profile"
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



export default {
    get,
    put,
}