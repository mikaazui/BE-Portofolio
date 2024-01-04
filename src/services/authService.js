import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { Prisma } from '../application/prisma.js'
dotenv.config()

const createToken = (res, token) => {
     //create TOKEN
     const jwtSecretToken = process.env.JWT_SECRET
     const maxAge = 60 * 60
     const email = Prisma.user.email
     var token = jwt.sign({ email: email }, jwtSecretToken, {
         expiresIn: maxAge
     });
     return token;

}
const updateUserToken = async (email, token) => {
     //update data user > send token
     const user = await Prisma.user.update({
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
    return user
}

export default {
    createToken,
    updateUserToken
}