import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { Prisma } from '../application/prisma.js'
dotenv.config()

const createToken = (res, email, age) => {
    //create TOKEN
    const jwtSecretToken = process.env.JWT_SECRET
    // const maxAge = process.env.SESSION_AGE
    const maxAge = age ? age : process.env.SESSION_AGE
    var token = jwt.sign({ email: email }, jwtSecretToken, {
        expiresIn: maxAge
    });
    res.cookie("token", token)
    return token

}
const updateUserToken = async (email, token) => {
    //update data user > send token
    const user = await Prisma.user.update({
        where: {
            email: email

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