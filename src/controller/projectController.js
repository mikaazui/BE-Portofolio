import { Prisma } from "../application/prisma.js"
import { Validate } from "../application/validate.js"
import { ResponseError } from "../error/responseError.js"
import { isID } from "../validation/mainValidation.js"
import { isProject } from "../validation/projectValidation.js"
import dayjs from 'dayjs';
const formatData = (project) => {
    const startDate = project.startDate
    const endDate = project.endDate
    project.readableStartDate = dayjs(startDate).format('MMMM YYYY')
    //endate
    project.readableEndDate = dayjs(endDate).format('MMMM YYYY')
    if (endDate == null) {
        project.readableEndDate = 'Present'
    } else {
        project.readableEndDate = dayjs(endDate).format('MMMM YYYY')
    }
};
const getAll = async (req, res, next) => {

    try {
        //page
        const page = parseInt(req.query.page) || 1

        //limit
        const limit = parseInt(req.query.limit) || 10
        const { data, total } = await getByPage(page, limit)
        const maxPage = Math.ceil(total / limit);

        res.status(200).json({
            message: 'berhasil masuk ke halaman project',
            data,
            page,
            total,
            maxPage
        });

    }
    catch (error) {
        next()
    }
};

const getByPage = async (page, limit) => {
    //caclculate skip
    const skip = (page - 1) * limit;

    const data = await Prisma.project.findMany({
        take: limit,
        skip
    });
    for (const project of data) {
        formatData(project)
    }
    //get total data
    const total = await Prisma.project.count()
    return {
        data,
        total
    }
}



const get = async (req, res, next) => {
    try {
        let id = req.params.id
        id = Validate(isID, id)

        const project = await Prisma.project.findUnique({
            where: { id }
        });

        //handle not found
        if (project == null) throw new ResponseError(404, `project ${id} not found`)
        formatData(project)
        res.status(200).json({
            message: `berhasil mendapatkan project ${id}`,
        });

    } catch (error) {
        next(error)
    }

}

const post = async (req, res, next) => {
    try {
        let data = req.body;
        data = Validate(isProject, data)

        const project = await Prisma.project.create({
            data: project
        });
        formatData(project)

        res.status(200).json({
            message: 'berhasil masuk ke halaman project',
            data: project
        })

    } catch (error) {
        next(error)
    }

}

const put = async (req, res, next) => {
    try {
        let project = req.body;
        let id = req.params.id;

        project = Validate(isProject, project)
        id = Validate(isID, id)

        const currentProject = await Prisma.project.findUnique({
            where: { id: id },
            select: { id: true }
        },

        formatData(currentProject)
        );

        if (!currentProject) throw new ResponseError(404, `project ${id} not found`);

        const updatedData = await Prisma.project.update({
            where: { id: id },
            data: project
        });
        res.status(200).json({
            message: `berhasil mengupdate project ${id}`,
            data: updatedData
        });

    } catch (error) {
        next(error)
    }

}

const remove = async (req, res, next) => {
    try {
        let id = req.params.id;

        id = Validate(isID, id);
        const currentProject = await Prisma.project.findUnique({
            where: { id },
            select: { id: true }
        });

        if (!currentProject) throw new ResponseError(404, `project ${id} not found`)
        //delete execution

        await Prisma.project.delete({
            where: { id: id }
        });
        res.status(200).json({
            message: `berhasil menghapus project ${id}`,
        });

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
    remove
}
