import dotenv from 'dotenv';
import jwt from 'jsonwebtoken'
import { Prisma } from '../application/prisma.js';
import authService from '../services/authService.js';

export const authMiddleware = async (req, res, next) => {
  try {

    //check cookie 
    const token = req.cookies.token;
    if (!token) {
      throw new Error()
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

    if (!user) {
      throw new Error()
    }

    const email = user.email
    const newToken = authService.createToken(res, email)
    const dataUser = await authService.updateUserToken(email, newToken);
    //masukin data user ke request
    req.user = dataUser;

    //kirim cookie
    res.cookie('token', newToken)
    //kalo ok ? next 
    next()
  } catch (error) {
    res.clearCookie('token')
    return res.status(401).json({
      message: 'Unauthorized'
    })

  }
}