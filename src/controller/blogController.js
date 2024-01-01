import { Prisma } from '../application/prisma.js'
import joi from 'joi'

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
        // cara lain dari isNaN
        // if (!Number(id)) {
        //     return res.status(400).json({
        //         message: "ID invalid"
        //     }
//////////////////////////////////////////////////////////////
        // if (isNaN(id)) {
        //     return res.status(400).json({
        //         message: "ID invalid"
        //     })
        // }

        // id = parseInt(id)

        const schema = joi.number().min(1).required();
        const validation = schema.validate(id)

        if(validation.error){
            res.status(400).json({
                message: validation.error.message
            })
        }
        console.log('validation<<<<<<<<<<<<<<<')
        console.log(validation)
        id = validation.value;
        

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
            data: blog

        });
    } catch (error) {
        res.status(500).json({
            message: "server error :" + error.message
        })
    }
}


const post = async (req, res) => {
    try {
        const blog = req.body;
        if (!blog.content || !blog.title) {
            return res.status(400).json({
                message: 'blog must be filled'
            })
        }

        if (blog.title.length < 3 || blog.content.length < 3) {
            return res.status(400).json({
                message: 'blog must be 3 characters or longer'
            })

        }


        const newBlog = await Prisma.blog.create({
            data: blog
        });

        res.status(200).json({
            message: 'saved to data blog',
            data: newBlog
        })

    } catch (error) {
        res.status(500).json({
            message: "server error :" + error.message
        })
    }

}

const put = async (req, res) => {
    try {
        const blog = req.body;
        let id = req.params.id;

        if (isNaN(id)) {
            return res.status(400).json({
                message: "ID invalid"
            })
        }

        id = parseInt(id)
        console.log(id)

        console.log(blog)

        if (!blog.content || !blog.title) {
            //400 bad request
            return res.status(400).json({
                message: 'blog must be filled'
            })
        }

        if (blog.title.length < 3 || blog.content.length < 3) {
            //bad reuqest content less than 3 characters
            return res.status(400).json({
                message: 'blog must be 3 characters or longer'
            })

        }

        const currentBlog = await Prisma.blog.findUnique({
            where: {
                id: id
            },
            select: {
                id: true
            }
        }
        )

        if (!currentBlog) {
            return res.status(404).json({
                message: `blog ${id} not found`
            })
        }

        const updatedData = await Prisma.blog.update({
            where: {
                id: id
            },
            data: blog
        })

        res.status(200).json({
            message: `Blog ${id} updated successfully`,
            id: id,
            updatedData: updatedData
        })



    } catch (error) {
        res.status(500).json({
            message: "server error :" + error.message
        })
    }

}

const updateBlogTitle = async (req, res) => {
    try {
        const blog = req.body;
        let id = req.params.id;
        if (isNaN(id)) {
            return res.status(400).json({
                message: "ID invalid"
            })
        }

        id = parseInt(id)
        console.log(id)

        console.log(blog)

        if (!blog.title) {
            //400 bad request
            return res.status(400).json({
                message: 'title must be filled'
            })
        }

        if (blog.title.length < 3) {
            //bad reuqest content less than 3 characters
            return res.status(400).json({
                message: 'title must be 3 characters or longer'
            })

        }

        const currentBlog = await Prisma.blog.findUnique({
            where: {
                id: id
            },
            select: {
                id: true
            }
        }
        )

        if (!currentBlog) {
            return res.status(404).json({
                message: `blog ${id} not found`
            })
        }
        //execution (patch)

        const updatedTitle = await Prisma.blog.update({
            where: {
                id: id
            },
            data: blog
        })

        res.status(200).json({
            message: `blog ${id} updated (title) successfully`,
            data: updatedTitle  
        });
        
    } catch (error) {
        res.status(500).json({
            message: "server error :" + error.message
        });
        
    }

}

const remove = async (req, res) => {
    try {
        let id = req.params.id;

        if (isNaN(id)) {
            return res.status(400).json({
                message: "ID invalid"
            })
        }
        id = parseInt(id)

        const currentBlog = await Prisma.blog.findUnique({
            where: {
                id
            },
            select: {
                id: true
            }
        }
        )

        if (!currentBlog) {
            return res.status(404).json({
                message: `blog ${id} not found`
            })
        }

        //delete execution

        await Prisma.blog.delete({
            where: {
                id: id
            }
        })


        res.status(200).json({
            message: 'deleted blog successfully',
            id: id
        })
        
    } catch (error) {
        
    }

}

export default {
    get,
    getAll,
    post,
    put,
    updateBlogTitle,
    remove

}