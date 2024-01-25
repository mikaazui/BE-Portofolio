import { Prisma } from "../application/prisma.js";
import { Validate } from "../application/validate.js";
import fileService from "../services/fileService.js";
import { isProfile } from "../validation/profileValidation.js";
import projectController from "./projectController.js";
import blogController from "./blogController.js";
import fs from 'fs/promises';
import educationController from "./educationController.js";
import experienceController from "./experienceController.js";
import skillController from "./skillController.js";
const get = async (req, res) => {
    try {
        //cek database
        let profile = await Prisma.profile.findFirst();


        //if ada > kirim data asli
        if (profile) {
            res.status(200).json({
                message: 'berhasil ambil data profile',
                data: profile
            });

        };

    } catch (error) {
        next(error);
    };
}

const put = async (req, res, next) => {
    try {
        //get data profile dari database. findFirst
        const profile = await Prisma.profile.findFirst();

        //collect data & validate
        //check
        let data = req.body;

        //add avatar
        if (req.file) {
            const avatar = '/' + req.file.path.replaceAll('\\', '/');
            data.avatar = avatar;
        }
        data = Validate(isProfile, data);
        console.log('data telah di validasi')
        console.log(data)

        //validate
        data = Validate(isProfile, data);

        let dataProfile = {};
        if (!profile) {
            //jika null > create data baru
            let dataProfile = await Prisma.profile.create({
                data
            });

        }
        if (profile) {
            //jika ada isinya ? update data yang ada
            //isi dari hasil update
            dataProfile = await Prisma.profile.update({
                where: {
                    email: profile.email
                },
                data
            });
            //hapus poto lama
            if (profile.avatar) {
                await fileService.removeFile(profile.avatar);
            }

        }

        res.status(200).json({
            message: 'berhasil update data profile secara keseluruhan bedasarkan id',
            data: profile
        })


    } catch (error) {
        //jika error dan ada file > hapus file
        if (req.file) {
            //handle buang file
            fileService.removeFile(req.file.path)

        }

        next(error)
    }

};

const portofolio = async (req, res, next) => {
    try {
        //ambil data profile
        const profile = await getProfile()
        //ambil data project // 4 data saja
        //extract variable data > varoiable project
        const { data: projects } = await projectController.getByPage(1, 4)
        //menghasilkan variable project

        //ambil data experience
        const { data: experiences } = await experienceController.getExperiences()
        //ambil data education
        const { data: educations } = await educationController.getEducations()

        //ambil data blog
        const { data: blogs } = await blogController.getByPage(1, 4)

        //ambil data skill by category
        // const {data: skills} = await skillController.getSkillByCategory()


        res.status(200).json({
            message: 'berhasil ambil data portofolio',
            data: {
                profile,
                projects,
                experiences,
                educations,
                blogs,
                // skills
            }
        })

    } catch (error) {
        next(error)
    }

}

const getProfile = async (req, res, next) => {
    try {
        //cek database
        let profile = await Prisma.profile.findFirst();

        //if kosong > kirim data dummy
        if (!profile) {
            //buat data dummy disini
            profile = {
                email: 'dummyexample@.com',
                firstName: '-',
                lastName: '-',
                dob: '1900-01-01',
                job: '-',
                address: '-',
                country: '-',
                city: '-'
            }
        };

        return profile;

    } catch (error) {
        next(error)
    }

};



export default {
    get,
    put,
    portofolio

}