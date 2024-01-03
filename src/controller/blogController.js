import { Prisma } from '../application/prisma.js'
import { Validate } from '../application/validate.js'
import { ResponseError } from '../error/responseError.js'
import { isBlog, isBlogTitle } from '../validation/blogValidation.js'
import { isID } from '../validation/mainValidation.js'




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
        id = Validate(isID, id)

        const blog = await Prisma.blog.findUnique({
            where: {
                id
            }
        })

        //handle not found
        if (blog == null) {
            throw new ResponseError(404, `blog ${id} not found`)
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
        blog = Validate(isBlog, blog)

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

        blog = Validate(isBlog, blog)
        id = Validate(isID, id)

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
            throw new ResponseError(404, `blog ${id} not found`)
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
        let title = req.body.title;
        let id = req.params.id;

        id = Validate(isID, id);
        title = Validate(isBlogTitle, title);

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
            throw new ResponseError(404, `blog ${id} not found`)
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

        id = Validate(isID, id);
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
            throw new ResponseError(404, `blog ${id} not found`)
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