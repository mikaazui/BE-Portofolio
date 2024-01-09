import { Prisma } from "../application/prisma.js";
import { Validate } from "../application/validate.js";
import { isProfile } from "../validation/profileValidation.js";
const get = async (req, res) => {
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
                address: '-'
            }
        };

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

        }

        res.status(200).json({
            message: 'berhasil update data profile secara keseluruhan bedasarkan id',
            data: profile
        })


    } catch (error) {
        next(error)
    }
};



export default {
    get,
    put,
}