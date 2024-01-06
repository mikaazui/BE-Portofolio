import { Prisma } from "../application/prisma.js";
const get = async (req, res) => {
    try {
        //cek database
        let profile = await Prisma.profile.findFirst()
    
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
        }
    
        //if ada > kirim data asli
        if (profile) {
            res.status(200).json({
                message: 'berhasil ambil data profile',
                data: profile
            })
    
        }
        
    } catch (error) {
        next(error)
    }
}

const put = (req, res) => {
    res.status(200).json({
        id: req.params.id,
        ip: req.ip,
        query: req.query,
        body: req.body,
        path: req.path,
        params: req.params
    })

    res.status(200).json({
        id: req.params.id,
        ip: req.ip,
        query: req.query,
        body: req.body,
        path: req.path,
        params: req.params
    })
}



export default {
    get,
    put,
}