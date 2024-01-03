import { Prisma } from "../application/prisma.js";
import { Validate } from "../application/validate.js";
import { ResponseError } from "../error/responseError.js";
import { isEducation } from "../validation/educationvalidation.js";
import { isID } from "../validation/mainValidation.js";

const getAll = async (req, res) => {
    console.log('masuk ========================')
    const education = await Prisma.education.findMany()
    if (education) {

        res.status(200).json({
            message: 'berhasil masuk ke halaman education (semua data)',
            education: education
        })

    }

}

const get = async (req, res, next) => {
    try {
        let id = req.params.id;
        id = Validate(isID, id);

        const education = await Prisma.education.findUnique({
            where: {
                id
            }
        })

        //handle not found
        if (education == null) {
          throw new ResponseError(404, `education ${id} not found`)
        }

        res.status(200).json({
            message: 'berhasil masuk ke halaman education (berdasakan id)',
            id: id,
            data: education

        });

    } catch (error) {
        next(error)
    }

}

const post = async (req, res, next) => {
    try {
        let education = req.body;
        education = Validate(isEducation, education)

        const newEducation = await Prisma.education.create({
            data: education
        });

        res.status(200).json({
            message: 'saved to data blog',
            data: newEducation
        })

    } catch (error) {
        next(error)

    }

}

const put = async (req, res, next) => {
    try {
        let education = req.body;
        let id = req.params.id;

        education = Validate(isEducation, blog)
        id = Validate(isID, id)

        const currentEducation = await Prisma.education.findUnique({
            where: {
                id: id
            },
            select: {
                id: true
            }
        }
        )

        if (!currentEducation) {
            throw new ResponseError(404, `education ${id} not found`)
        }

        const updatedData = await Prisma.education.update({
            where: {
                id: id
            },
            data: education
        })

        res.status(200).json({
            message: `education ${id} updated successfully`,
            id: id,
            updatedData: updatedData
        })
    } catch (error) {
        next(error)
    }

}

const remove = async (req, res, next) => {
    try {
        let id = req.params.id;

        id = Validate(isID, id);
        const currentEducation = await Prisma.education.findUnique({
            where: {
                id
            },
            select: {
                id: true
            }
        }
        )

        if (!currentEducation) {
            throw new ResponseError(404, `education ${id} not found`)
        }

        //delete execution

        await Prisma.education.delete({
            where: {
                id: id
            }
        })


        res.status(200).json({
            message: 'deleted education successfully',
            id: id
        })
    } catch (error) {
        next(error)
    }

}

export default {
    getAll,
    get,
    post,
    put,
    remove
}