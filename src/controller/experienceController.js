import { Prisma } from '../application/prisma.js'
import { Validate } from '../application/validate.js'
import { ResponseError } from '../error/responseError.js'
import { isExperience } from '../validation/experienceValidation.js'
import { isID } from '../validation/mainValidation.js'

const getAll = async (req, res) => {
    const experience = await Prisma.experience.findMany()

    res.status(200).json({
        message: 'berhasil masuk ke halaman experiences (semua data)',
        experience
    })

}

const get = async (req, res, next) => {
    try {
        let id = req.params.id
        id = Validate(isID, id)

        const experience = await Prisma.experience.findUnique({ where: { id } });
        //handle not found
        if (experience == null) throw new ResponseError(404, `experience ${id} not found`)

        res.status(200).json({
            message: 'berhasil masuk ke halaman experiences (berdasakan id)',
            id,
            experience

        });
    } catch (error) {
        next(error)
    }
}


const post = async (req, res, next) => {
    try {
        let experience = req.body;
        experience = Validate(isExperience, experience)

        const data = await Prisma.experience.create({ data: experience });

        res.status(200).json({
            message: 'saved to data experience',
            data
        })

    } catch (error) {
        next(error)
    }
}

const put = async (req, res, next) => {
    try {
        let experience = req.body;
        let id = req.params.id;

        experience = Validate(isExperience, experience)
        id = Validate(isID, id)

        const currentExperience = await Prisma.experience.findUnique({
            where: { id }, select: { id: true }
        })

        if (!currentExperience) throw new ResponseError(404, `experience ${id} not found`)

        const data = await Prisma.experience.update({
            where: { id },
            data: experience
        })

        res.status(200).json({
            message: `Blog ${id} updated successfully`,
            id,
            data
        })
    } catch (error) {
        next(error)
    }
}

const remove = async (req, res, next) => {
    try {
        let id = req.params.id;

        id = Validate(isID, id);
        const currentExperience = await Prisma.experience.findUnique({
            where: { id },
            select: { id: true }
        })
        if (!currentExperience) throw new ResponseError(404, `experience ${id} not found`)

        //delete execution
        await Prisma.experience.delete({ where: { id } })

        res.status(200).json({
            message: 'deleted experience successfully',
            id
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