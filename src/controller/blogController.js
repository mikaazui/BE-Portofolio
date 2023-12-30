import { Prisma } from '../application/prisma.js'

const getAll = async (req, res) => {

    const blog = await Prisma.blog.findMany()

    res.status(200).json({
        message: 'berhasil masuk ke halaman blog (semua data)',
        blog: blog
    })

}

const get = async (req, res) => {
    let id = req.params.id
    id = parseInt(id)
    const blog = await Prisma.blog.findUnique({
        where: {
            id
        }
    });

    res.status(200).json({
        message: 'berhasil masuk ke halaman blogs (berdasakan id)',
        id: id,
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
    getAll,
    post,
    put,
    patch,
    remove
}