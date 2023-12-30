import { Prisma } from '../application/prisma.js'

const get = async (req, res) => {
    const blog = await Prisma.blog.findMany()
    
    res.status(200).json({
        message: 'berhasil masuk ke halaman blog',
        blog: blog
    })

}

const post = (req, res) => {
    res.status(200).json({
        message: 'berhasil masuk ke halaman blog',
    })

}

const put = (req, res) => {
    res.status(200).json({
        message: 'berhasil masuk ke halaman blog',
    })

}

const patch = (req, res) => {
    res.status(200).json({
        message: 'berhasil masuk ke halaman blog',
    })

}

const remove = (req, res) => {
    res.status(200).json({
        message: 'berhasil masuk ke halaman blog',
    })

}

export default {
    get,
    post,
    put,
    patch,
    remove
}