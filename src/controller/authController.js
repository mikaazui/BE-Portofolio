import dotenv from 'dotenv';
import { Prisma } from "../application/prisma.js"
import { Validate } from "../application/validate.js"
import { ResponseError } from "../error/responseError.js";
import { loginValidate } from "../validation/authValidate.js"
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt';

const login = async (req, res, next) => {
    try {
        console.log('masuk proses login')
        //ambil data > email && password
        let loginData = req.body
        console.log(loginData)
        loginData = Validate(loginValidate, loginData)

        //check email (in databse or not)
        const user = await Prisma.user.findUnique({
            where: {
                email: loginData.email
            }
        })
        //check email
        if (!user) {
            throw new ResponseError(400, 'Email or Password is Invalid')
        }

        //check password/compare password
        const clientPass = loginData.password;
        const dbPass = user.password;
        const checkPass = await bcrypt.compare(clientPass, dbPass);

        if (!checkPass) throw new ResponseError(400, 'Email or Password is Invalid')

        //create TOKEN
        const jwtSecretToken = process.env.JWT_SECRET
        const maxAge = 60 * 60
        let token = jwt.sign({ email: user.email }, jwtSecretToken, {
            expiresIn: maxAge
        })
        //update data user > send token
        const data = await Prisma.user.update({
            where: {
                email: loginData.email
            },
            data: {
                token: token
            },  
            select: {
                name: true,
                email: true
            }
        });
        //send cookies
        console.log(data)
        res.cookie('token', token)

        //ambil datauser 
        res.status(200).json({
            message: 'login success',
            data: data,
            token: token
        })


    } catch (error) {
        next(error)

    }
}

const logout = async (req, res, next) => {
    res.clearCookie('token')
    res.clearCookie('name')

    res.status(200).json({
        message: 'logout success'
    })
}

export default {
    login,
    logout
}