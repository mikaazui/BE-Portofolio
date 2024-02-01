import { Prisma } from "../application/prisma.js"
import { Validate } from "../application/validate.js"
import { ResponseError } from "../error/responseError.js"
import fileService from "../services/fileService.js"
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

    const skills = project.skills.map(projectSkill => {
        return projectSkill.Skill
    })
    project.skills = skills;
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
        include: { photos: true, skills: { include: { Skill: true } } },
        orderBy: { startDate: 'asc' },
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
            where: { id },
            include: { photos: true, skills: { include: { Skill: true } } },
        });

        //handle not found
        if (project == null) throw new ResponseError(404, `project ${id} not found`)
        formatData(project)
        res.status(200).json({
            project
        });

    } catch (error) {
        next(error)
    }

}

const post = async (req, res, next) => {
    try {
        //mengumpulkan photo path
        const photos = fileService.getUploadedPhotos(req)

        let project = req.body;
        project = Validate(isProject, project)

        console.log(photos)
        console.log(project)

        const skills = project.skills.map(s => {
            return {
                skillId: s
            }
        });

        const data = await Prisma.project.create({
            data: {
                ...project,
                photos: { create: photos },
                skills: {
                    createMany: { data: skills }
                },
            },
            include: { photos: true, skills: { include: { Skill: true } } },
        });
        res.status(200).json(data)

    } catch (error) {
        next(error)
    };

    ;
}

const put = async (req, res, next) => {
    try {
        let project = req.body;
        let id = req.params.id;

        project = Validate(isProject, project)
        id = Validate(isID, id)

        const currentProject = await Prisma.project.findUnique({
            where: { id: id },
            include: { photos: true, skills: true }
        }
        );

        if (!currentProject) throw new ResponseError(404, `project ${id} not found`);

        const currentPhotos = currentProject.photos.map(photo => photo.id)
        const idYangDipertahankan = project.photos || []; //deafult array kosong []
        console.log('currentPhotos')
        console.log(currentPhotos)
        //filter photo yang di pertahankan

        //ambil photo yang tidak dipertahankan
        const keepPhotos = currentPhotos.filter(idPhoto => idYangDipertahankan.includes(idPhoto));
        const photos_to_be_removed = currentProject.photos.filter(idPhoto => !idYangDipertahankan.includes(idPhoto));
        console.log('keepPhotos')
        console.log(keepPhotos)
        console.log('photos_to_be_removed')
        console.log(photos_to_be_removed)
        //update blog
        // data yang mau diupdate
        //hapus variable photo

        delete project.photos;
        //ambil photo yang tidak dihapus
        //create photo baru
        //buang photo ya gitdak dipertahankan
        //simpan photo baru
        const newPhotos = fileService.getUploadedPhotos(req)
        let skills = [];
        if (project.skills) {
            skills = project.skills.map(s => {
                return { skillId: s }
            });
        };


        delete project.skills;
        // throw new Error('inio bukan error tapi alert update test ==========')
        //update blog + delete photo yang tidak dipertahankan
        const data = await Prisma.project.update({
            where: { id },
            data: {
                ...project,
                photos: {
                    deleteMany: {
                        id: {
                            notIn: keepPhotos
                        }
                    },
                    create: newPhotos,
                }
                ,
                skills: {
                    deleteMany: {}, //clear data relasi
                    createMany: { data: skills } //simpan ulang, data hasil mapping
                },
            },
            include: { photos: true, skills: { include: { Skill: true } } },
        });

        for (const photo of currentProject.photos) {
            await fileService.removeFile(photo.path)
        }

        formatData(data)
        res.status(200).json({
            data
        });

    } catch (error) {
        next(error)
    }

};
//TODO bikin method hapus photo
const remove = async (req, res, next) => {
    try {
        let id = req.params.id;

        id = Validate(isID, id);
        const currentProject = await Prisma.project.findUnique({
            where: { id },
            include: { photos: true }
        });

        if (!currentProject) throw new ResponseError(404, `project ${id} not found`)


        for (const photo of currentBlog.photos) {
            await fileService.removeFile(photo.path)
        }
        //delete execution

        await Prisma.project.delete({
            where: { id: id }
        });
        res.status(200).json({
            message: `project ${id} deleted successfully`,
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
