import { Prisma } from '../application/prisma.js'

const getAll = async (req, res) => {

    const blog = await Prisma.blog.findMany()

    res.status(200).json({
        message: 'berhasil masuk ke halaman blog (semua data)',
        blog: blog
    })

}

const get = async (req, res) => {
    try {
        let id = req.params.id

        // if (!Number(id)) {
        //     return res.status(400).json({
        //         message: "ID invalid"
        //     }

    if (isNaN(id)) {
                return res.status(400).json({
                    message: "ID invalid"
                })
            }

            id = parseInt(id)
            
            const blog = await Prisma.blog.findUnique({
                where: {
                    id
                }
            })


            //handle not found
            if (blog == null) {
                return res.status(404).json({
                    message: 'blog tidak ditemukan'
                })
            }



            res.status(200).json({
                message: 'berhasil masuk ke halaman blogs (berdasakan id)',
                id: id,
                blog: blog

            });

        } catch (error) {
            res.status(500).json({
                message: "server error :" + error.message
            })
        }








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