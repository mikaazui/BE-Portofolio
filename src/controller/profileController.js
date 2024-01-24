import { Prisma } from "../application/prisma.js";
import { Validate } from "../application/validate.js";
import fileService from "../services/fileService.js";
import { isProfile } from "../validation/profileValidation.js";
import projectController from "./projectController.js";
import fs from 'fs/promises';
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
        const { data: project } = await projectController.getByPage(2, 0)
        //menghasilkan variable project
        
        //ambil data experience

        //ambil data education

        //ambil data blog

        //ambil data skill by category


        res.status(200).json({
            message: 'berhasil ambil data portofolio',
            data: {
                profile,
                project: project
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