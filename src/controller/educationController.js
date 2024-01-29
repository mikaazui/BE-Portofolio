import { Prisma } from "../application/prisma.js";
import { Validate } from "../application/validate.js";
import { ResponseError } from "../error/responseError.js";
import { isEducation } from "../validation/educationvalidation.js";
import { isID } from "../validation/mainValidation.js";
import dayjs from 'dayjs';
//TODO rapihin lagi (buat lebih konsisten variable2nya)
const formatData = (education) => {
    const startYear = education.startYear
    const endYear = education.endYEar
    education.readableStartDate = dayjs(startYear).format('MMMM YYYY')
    //endate
    education.readableEndDate = dayjs(endYear).format('MMMM YYYY')
    if (endYear == null) {
        education.readableEndDate = 'Present'
    } else {
        education.readableEndDate = dayjs(endYear).format('MMMM YYYY')
    }
};
const getAll = async (req, res) => {
    const data = await getEducations()
    if (data) {

        res.status(200).json({
            message: 'berhasil masuk ke halaman education (semua data)',
            data
        });

    }
};

const getEducations = async () => {
    const data = await Prisma.education.findMany({
        orderBy: { 'startYear': 'desc' }
    });
    for (const education of data) {
        formatData(education)
    }
    return data;

};
//TODO rapihin lagi (bikin shorthand operation)
const get = async (req, res, next) => {
    try {
        let id = req.params.id;
        id = Validate(isID, id);

        const education = await Prisma.education.findUnique({ where: { id } });

        //handle not found
        if (education == null) throw new ResponseError(404, `education ${id} not found`);
        formatData(education)

        res.status(200).json({
            message: 'berhasil masuk ke halaman education (berdasakan id)',
            id, data: education
        });

    } catch (error) {
        next(error)
    }
};

const post = async (req, res, next) => {
    try {
        let education = req.body;
        education = Validate(isEducation, education)

        const data = await Prisma.education.create({
            data: education
        });
        formatData(data)

        res.status(200).json({
            message: 'saved to data blog', data
        });

    } catch (error) {
        next(error)
    }
};

const put = async (req, res, next) => {
    try {
        let education = req.body;
        let id = req.params.id;

        education = Validate(isEducation, education)
        id = Validate(isID, id)

        const currentEducation = await Prisma.education.findUnique({
            where: { id },
            select: { id: true }
        });

        if (!currentEducation) throw new ResponseError(404, `education ${id} not found`)

        const data = await Prisma.education.update({
            where: { id },
            data: education
        });
        formatData(data)

        res.status(200).json({
            message: `education ${id} updated successfully`,
            id, data
        });
    } catch (error) {
        next(error)
    }

}

const remove = async (req, res, next) => {
    try {
        let id = req.params.id;

        id = Validate(isID, id);
        const currentEducation = await Prisma.education.findUnique({
            where: { id },
            select: { id: true }
        }
        );

        if (!currentEducation) throw new ResponseError(404, `education ${id} not found`)
        //delete execution

        await Prisma.education.delete({
            where: { id }
        });


        res.status(200).json({
            message: 'deleted education successfully',
            id
        });
    } catch (error) {
        next(error)
    }

}

export default {
    getAll,
    getEducations,
    get,
    post,
    put,
    remove
}