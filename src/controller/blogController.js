import { Prisma } from '../application/prisma.js'
import { Validate } from '../application/validate.js'
import { ResponseError } from '../error/responseError.js'
import fileService from '../services/fileService.js'
import { isBlog, isBlogTitle } from '../validation/blogValidation.js'
import { isID } from '../validation/mainValidation.js'
import dayjs from 'dayjs'
const formatData = (blog) => {
    const date = blog.createdAt
    blog.readableDate = dayjs(date).format('dddd DD MMMM YYYY')
    blog.shortDate = dayjs(date).format('ddd DD MMM YYYY')
}
const getAll = async (req, res) => {
    {
        //page
        const page = parseInt(req.query.page) || 1
        //limit
        const limit = parseInt(req.query.limit) || 10
        //ga perlu formatData karena sudah dari getByPagenya
        const { data, total } = await getByPage(page, limit)
        const maxPage = Math.ceil(total / limit);

        res.status(200).json({
            message: 'berhasil masuk ke halaman blog (semua data)',
            data,
            page,
            maxPage,
            total
        })

    }
};

const getByPage = async (page, limit) => {
    //calculate skip
    const skip = (page - 1) * limit;


    const data = await Prisma.blog.findMany({
        take: limit,
        skip,
        include: {
            photos: true
        }
    });
    //di loop karena banyak isinya
    for (const blog of data) {
        formatData(blog)
    }

    //get total data
    const total = await Prisma.blog.count()
    return {
        data,
        total
    }
};



const get = async (req, res, next) => {
    try {
        let id = req.params.id
        id = Validate(isID, id)

        const blog = await Prisma.blog.findUnique({
            where:
                { id },
            include: { photos: true }
        });
        //handle not found
        if (blog == null) throw new ResponseError(404, `blog ${id} not found`)

        formatData(blog)
        res.status(200).json({
            message: 'berhasil masuk ke halaman blogs (berdasakan id)',
            id,
            blog

        });
    } catch (error) {
        next(error)
    }
}
const post = async (req, res, next) => {
    try {
        //mengumpulkan photo path
        const photos = []
        if (req.files) {
            //handle upload
            for (const file of req.files) {
                // add slash to photot
                let photo = '/' + file.path.replaceAll('\\', '/')
                //bikin object berdasaran schema prisma
                photo = {
                    path: photo
                }
                photos.push(photo)

            }
        }

        let blog = req.body;
        blog = Validate(isBlog, blog)

        const data = await Prisma.blog.create({
            data: {
                ...blog,
                photos: {
                    create: photos
                }
            },
            include: {
                photos: true
            }

        });
        formatData(data)

        res.status(200).json({
            message: 'saved to data blog',
            data
        })

    } catch (error) {
        if (req.files) {
            //handle buang file
            for (const file of req.files) {
                fileService.removeFile(file.path)
            }
        }
        next(error)
    }
}
//blog id : 14
// "/uploads/photos-1706500693814-648481283.jpg"
// /uploads/photos-1706500590061-18980254.jpg

//TODO LANJUTIN ESOK HARI

const put = async (req, res, next) => {
    try {
        let blog = req.body;
        let id = req.params.id;

        console.log('req body =============')
        console.log(req.body)
        console.log('req files =============')
        console.log(req.files)
        //new photo
        const newPhotos = req.files
        
        
        //validate blog
        blog = Validate(isBlog, blog)
        //validate id
        id = Validate(isID, id)

        throw new Error ('test update')

        const currentBlog = await Prisma.blog.findUnique({
            where: { id }, select: { id: true }
        })

        if (!currentBlog) throw new ResponseError(404, `blog ${id} not found`)

        const data = await Prisma.blog.update({
            where: { id },
            data: blog
        })
        formatData(data)

        res.status(200).json({
            message: `Blog ${id} updated successfully`,
            id,
            data
        })
    } catch (error) {
        if (req.files) {
            //handle buang file
            for (const file of req.files) {
                fileService.removeFile(file.path)
            }
        }
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
            where: { id },
            select: { id: true }
        })

        if (!currentBlog) throw new ResponseError(404, `blog ${id} not found`)

        //execution (patch)

        const data = await Prisma.blog.update({
            where: { id },
            title,
            include: { photos: true }
        })

        res.status(200).json({
            message: `Blog ${id} updated successfully`,
            id,
            data
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
            where: { id },
            select: { id: true }
        })
        if (!currentBlog) throw new ResponseError(404, `blog ${id} not found`)

        //delete execution
        await Prisma.blog.delete({ where: { id } })

        res.status(200).json({
            message: 'deleted blog successfully',
            id
        })

    } catch (error) {
        next(error)
    }

}

export default {
    get,
    getAll,
    getByPage,
    post,
    put,
    updateBlogTitle,
    remove
}