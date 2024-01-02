import { Prisma } from '../application/prisma.js'
import { Validate } from '../application/validate.js'
import joi from 'joi'



const getAll = async (req, res) => {

    const blog = await Prisma.blog.findMany()

    res.status(200).json({
        message: 'berhasil masuk ke halaman blog (semua data)',
        blog: blog
    })

}

const get = async (req, res, next) => {
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

        const schema = joi.number().min(1).positive().label("id").required();
        // const validation = schema.validate(id)

        // if (validation.error) {
        //     return res.status(400).json({
        //         message: validation.error.message
        //     })
        // }
        // console.log('validation<<<<<<<<<<<<<<<')
        // console.log(validation)
        // id = validation.value;


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

        next(error)
    }
}


const post = async (req, res, next) => {
    try {
        let blog = req.body;
        //     return res.status(400).json({
        //         message: 'blog must be filled'
        //     })
        // }

        //     return res.status(400).json({
        //         message: 'blog must be 3 characters or longer'
        //     })

        // }
        //start joi validate (blog)
        const schema = joi.object({
            title: joi.string().min(3).max(100).required().label('Title').trim(),
            content: joi.string().min(3).required().label('Content').trim()
        })

        const validationBlog = schema.validate(blog, ({
            abortEarly: false
        }));
        if (validationBlog.error) {
            return res.status(400).json({
                message: validationBlog.error.message
            })
        }

        blog = validationBlog.value
        //end joi validate(blog)

        const newBlog = await Prisma.blog.create({
            data: blog
        });

        res.status(200).json({
            message: 'saved to data blog',
            data: newBlog
        })

    } catch (error) {
        next(error)
    }

}

const put = async (req, res, next) => {
    try {
        let blog = req.body;
        let id = req.params.id;

        // if (isNaN(id)) {
        //     return res.status(400).json({
        //         message: "ID invalid"
        //     })
        // }

        // id = parseInt(id)
        //     //400 bad request
        //     return res.status(400).json({
        //         message: 'blog must be filled'
        //     })
        // }

        //     return res.status(400).json({
        //         message: 'blog must be 3 characters or longer'
        //     })

        // }

        //start joi validation(id)
        const schemaId = joi.number().min(1).positive().label("id").required();
        const validation = schemaId.validate(id)

        if (validation.error) {
            return res.status(400).json({
                message: validation.error.message
            })
        }
        console.log('validation<<<<<<<<<<<<<<<')
        console.log(validation)
        id = validation.value;
        //end joi validation (id)

        //start joi validate (blog)
        const schema = joi.object({
            title: joi.string().min(3).max(100).required().label('Title').trim(),
            content: joi.string().min(3).required().label('Content').trim()
        })

        const validationBlog = schema.validate(blog, ({
            abortEarly: false
        }));
        if (validationBlog.error) {
            return res.status(400).json({
                message: validationBlog.error.message
            })
        }

        blog = validationBlog.value
        //end joi validate(blog)

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
        next(error)
    }

}

const updateBlogTitle = async (req, res, next) => {
    try {
        const blog = req.body;
        let id = req.params.id;

        //start joi validation
        const schemaId = joi.number().min(1).positive().label("id").required();
        const validation = schemaId.validate(id)

        if (validation.error) {
            return res.status(400).json({
                message: validation.error.message
            })
        }
        console.log('validation<<<<<<<<<<<<<<<')
        console.log(validation)
        id = validation.value;
        //end joi validation

        //start joi validate (blog)
        const schemaTitle = joi.string().min(3).max(100).required().label('Title').trim()
        const validationBlog = schemaTitle.validate(title)

        if (validationBlog.error) {
            return res.status(400).json({
                message: validationBlog.error.message
            })
        }

        title = validationBlog.value
        //end joi validate(blog)

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
            title: title
        })

        res.status(200).json({
            message: `blog ${id} updated (title) successfully`,
            data: updatedTitle
        });

    } catch (error) {
        next(error)

    }

}

const remove = async (req, res, next) => {
    try {
        let id = req.params.id;

        // if (isNaN(id)) {
        //     return res.status(400).json({
        //         message: "ID invalid"
        //     })
        // }
        // id = parseInt(id)

        //start joi validation
        const schema = joi.number().min(1).positive().label("id").required();
        const validation = schema.validate(id)

        if (validation.error) {
            return res.status(400).json({
                message: validation.error.message
            })
        }
        console.log('validation<<<<<<<<<<<<<<<')
        console.log(validation)
        id = validation.value;
        //end joi validation
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
        next(error)
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