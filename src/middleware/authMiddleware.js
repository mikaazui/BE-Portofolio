import dotenv from 'dotenv';
import jwt from 'jsonwebtoken'
import { Prisma } from '../application/prisma.js';
import authService from '../services/authService.js';

export const authMiddleware = async (req, res, next) => {
  try {

    console.log('enter routeBlog middleware ==========')
    //check cookie 
    const token = req.cookies.token;
    console.log(token)
    if (!token) {
      return res.status(401).json({
        message: 'Unauthorized'
      })
    }
    ///check siapa pemilik token 
    const user = await Prisma.user.findFirst({
      where: {
        token: token
      },
      select: {
        name: true,
        email: true
      }
    });
    console.log('==============')
    console.log(user)

    if (!user) {
      res.clearCookie('token')
      throw new error()
    }

    const email = user.email
    const newToken = authService.createToken(res, email)
    const dataUser = await authService.updateUserToken(email, newToken);
    console.log(dataUser)
    console.log('dataUser======================')
    //masukin data user ke request
    req.user = dataUser;

    //kirim cookie
    res.cookie('token', newToken)
    //kalo ok ? next 
    next()
  } catch (error) {
    return res.status(401).json({
      message: 'Unauthorized'
    })

  }
}