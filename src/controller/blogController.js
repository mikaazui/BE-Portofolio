import { Prisma } from '../application/prisma.js';
import { Validate } from '../application/validate.js';
import { ResponseError } from '../error/responseError.js';
import fileService from '../services/fileService.js';
import { isBlog, isBlogTitle } from '../validation/blogValidation.js';
import { isID } from '../validation/mainValidation.js';
import dayjs from 'dayjs';
const formatData = (blog) => {
    const date = blog.createdAt;
    blog.readableDate = dayjs(date).format('dddd DD MMMM YYYY');
    blog.shortDate = dayjs(date).format('ddd DD MMM YYYY');
};
const getAll = async (req, res) => {
    {
        //page
        const page = parseInt(req.query.page) || 1;
        //limit
        const limit = parseInt(req.query.limit) || 10;
        //search
        const search = req.query.search || '';

        console.log(search)
        
        //ga perlu formatData karena sudah dari getByPagenya
        const { data, total } = await getByPage(page, limit, search);
        const maxPage = Math.ceil(total / limit);

        res.status(200).json({
            data,
            page,
            limit,
            maxPage,
            total
        });

    }
};

const getByPage = async (page, limit, search = '') => {
    //calculate skip
    const skip = (page - 1) * limit;
    
    
    const data = await Prisma.blog.findMany({
        where: { title: { contains: search } },
        take: limit,
        skip,
        include: { photos: true },
        orderBy: { createdAt: 'desc' }//ambil yang terbaru
    });
    //di loop karena banyak isinya
    for (const blog of data) { formatData(blog); }
    
    //get total data
    const total = await Prisma.blog.count({
        where: { title: { contains: search } }
    });
    return { data, total };
};

const get = async (req, res, next) => {
    try {
        let id = req.params.id;
        id = Validate(isID, id);

        const blog = await Prisma.blog.findUnique({
            where:
                { id },
            include: { photos: true }
        });
        //handle not found
        if (blog == null) throw new ResponseError(404, `blog ${id} not found`);

        formatData(blog);
        res.status(200).json(blog);
    } catch (error) {
        next(error);
    }
};


const post = async (req, res, next) => {
    try {
        //mengumpulkan photo path
        const photos = fileService.getUploadedPhotos(req);

        let blog = req.body;
        blog = Validate(isBlog, blog);

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
        formatData(data);

        res.status(200).json(data);

    } catch (error) {
        if (req.files) {
            //handle buang file kila terjadi error
            for (const file of req.files) {
                fileService.removeFile(file.path);
            }
        }
        next(error);
    }
};

const put = async (req, res, next) => {
    console.log('masuk method put');
    try {
        let blog = req.body;
        let id = req.params.id;

        console.log('req body =============');
        console.log(req.body);
        console.log('req files =============');
        console.log(req.files);


        //validate blog
        blog = Validate(isBlog, blog);
        //validate id
        id = Validate(isID, id);


        const currentBlog = await Prisma.blog.findUnique({
            where: { id }, include: { photos: true }
        });

        if (!currentBlog) throw new ResponseError(404, `blog ${id} not found`);

        const currentPhotos = currentBlog.photos.map(photo => photo.id);
        const idYangDipertahankan = blog.photos || []; //deafult array kosong []
        //filter photo yang di pertahankan

        //ambil photo yang tidak dipertahankan
        const keepPhotos = currentPhotos.filter(idPhoto => idYangDipertahankan.includes(idPhoto));
        const photos_to_be_removed = currentBlog.photos.filter(idPhoto => !idYangDipertahankan.includes(idPhoto));
        // console.log('currentPhotosan)
        console.log('keepPhotos');
        console.log(keepPhotos);
        console.log('photos_to_be_removed');
        console.log(photos_to_be_removed);

        // throw new Error ('test error') 
        //hapus variable photo
        delete blog.photos;
        //ambil photo yang tidak dihapus

        console.log(blog);

        // throw new Error('inio bukan error tapi alert update test ==========')
        //create photo baru
        //buang photo ya gitdak dipertahankan
        //simpan photo baru
        const newPhotos = fileService.getUploadedPhotos(req);

        //update blog + delete photo yang tidak dipertahankan
        const data = await Prisma.blog.update({
            where: { id },
            data: {
                ...blog, photos: { deleteMany: { id: { notIn: keepPhotos } }, create: newPhotos }
            },
            include: { photos: true }
        });

        // remove unused photo
        for (const photo of photos_to_be_removed) {
            await fileService.removeFile(photo.path);
        }

        formatData(data);

        res.status(200).json({
            id,
            data
        });
    } catch (error) {
        console.log(error);
        if (req.files) {
            //handle buang file jika terjadi error
            for (const file of req.files) {
                fileService.removeFile(file.path);
            }
        }
        next(error);
    }
};
const updateBlogTitle = async (req, res, next) => {
    try {
        let title = req.body.title;
        let id = req.params.id;

        id = Validate(isID, id);
        title = Validate(isBlogTitle, title);

        const currentBlog = await Prisma.blog.findUnique({
            where: { id },
            select: { id: true }
        });
        if (!currentBlog) throw new ResponseError(404, `blog ${id} not found`);
        //execution (patch)
        const data = await Prisma.blog.update({
            where: { id },
            data: { title },
            include: { photos: true }
        });

        res.status(200).json(data);
    } catch (error) {
        next(error);
    }
};

const remove = async (req, res, next) => {
    try {
        let id = req.params.id;

        id = Validate(isID, id);
        const currentBlog = await Prisma.blog.findUnique({
            where: { id },
            include: { photos: true }
        });
        if (!currentBlog) throw new ResponseError(404, `blog ${id} not found`);

        for (const photo of currentBlog.photos) {
            await fileService.removeFile(photo.path);
        }

        //delete execution
        await Prisma.blog.delete({ where: { id } });

        res.status(200).json({
            message: 'delete successs',
            id
        });

    } catch (error) {
        next(error);
    }

};

export default {
    get,
    getAll,
    getByPage,
    post,
    put,
    updateBlogTitle,
    remove
};