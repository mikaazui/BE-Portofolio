import { Prisma } from "../application/prisma.js"
import { Validate } from "../application/validate.js"
import { ResponseError } from "../error/responseError.js"
import { isID } from "../validation/mainValidation.js"
import { isProject } from "../validation/projectValidation.js"

const getAll = async (req, res, next) => {
    try {
        const project = await Prisma.project.findMany()

        res.status(200).json({
            message: 'berhasil masuk ke halaman project',
            data: project
        })
        
    } catch (error) {
        next()
    }

}
const get = async (req, res, next) => {
    try {
        let id = req.params.id
        id = Validate(isID, id)

        const project = await Prisma.project.findUnique({
            where: {
                id
            }
        })

        //handle not found
        if (project == null) {
            throw new ResponseError(404, `project ${id} not found`)
        }
        res.status(200).json({
            message: 'berhasil masuk ke halaman project',
        })
        
    } catch (error) {
        next(error)
    }

}

const post = async (req, res, next) => {
    try {
        let project = req.body;
        project = Validate(isProject, project)

        const newProject = await Prisma.project.create({
            data: project
        });

        res.status(200).json({
            message: 'berhasil masuk ke halaman project',
            data: newProject
        })
        
    } catch (error) {
        next(error)
    }

}

const put =  async (req, res, next) => {
    try {
        let project = req.body;
        let id = req.params.id;

        project = Validate(isProject, project)
        id = Validate(isID, id)

        const currentProject = await Prisma.project.findUnique({
            where: {
                id: id
            },
            select: {
                id: true
            }
        }
        )

        if (!currentProject) {
            throw new ResponseError(404, `project ${id} not found`)
        }

        const updatedData = await Prisma.project.update({
            where: {
                id: id
            },
            data: updatedData
        })
        res.status(200).json({
            message: 'berhasil masuk ke halaman project',
        })
        
    } catch (error) {
        next(error)
    }

}

const remove = async (req, res, next) => {
    try {
        let id = req.params.id;

        id = Validate(isID, id);
        const currentProject = await Prisma.project.findUnique({
            where: {
                id
            },
            select: {
                id: true
            }
        }
        )

        if (!currentProject) {
            throw new ResponseError(404, `project ${id} not found`)
        }

        //delete execution

        await Prisma.project.delete({
            where: {
                id: id
            }
        })
        res.status(200).json({
            message: 'berhasil menghapus data project',
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
    remove
}