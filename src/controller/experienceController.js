import { Prisma } from '../application/prisma.js'
import { Validate } from '../application/validate.js'
import { ResponseError } from '../error/responseError.js'
import { isExperience } from '../validation/experienceValidation.js'
import { isID } from '../validation/mainValidation.js'
import dayjs from 'dayjs'

const formatData = (experiences) => {
    const startDate = experiences.startDate
    const endDate = experiences.endDate
    experiences.readableStartDate = dayjs(startDate).format('MMMM YYYY')
    //endate
    experiences.readableEndDate = dayjs(endDate).format('MMMM YYYY')
    if (endDate == null) {
        experiences.readableEndDate = 'Present'
    } else {
        experiences.readableEndDate = dayjs(endDate).format('MMMM YYYY')
    }
};
const getAll = async (req, res) => {
    const data = await getExperiences()
    if (data) {

        res.status(200).json({
            message: 'berhasil masuk ke halaman experience (semua data)',
            data
        });

    }
};

const getExperiences = async () => {
    const data = await Prisma.experience.findMany({
        orderBy: { 'startDate': 'desc' }
    });
    //di loop karena banyak isinya
    for (const experiences of data) {
        formatData(experiences)
    };

    return data;

};

const get = async (req, res, next) => {
    try {
        let id = req.params.id
        id = Validate(isID, id)

        const data = await Prisma.experience.findUnique({ where: { id } });
        //handle not found
        if (data == null) throw new ResponseError(404, `experience ${id} not found`)
        formatData(data)

        res.status(200).json({
            message: 'berhasil masuk ke halaman experiences (berdasakan id)',
            id,
            data

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
        formatData(data)

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
            formatData(data)

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
    getAll,
    getExperiences,
    get,
    post,
    put,
    remove
}