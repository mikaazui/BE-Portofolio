import dotenv from 'dotenv';
import jwt from 'jsonwebtoken'
import { Prisma } from '../application/prisma.js';

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
  
      //check cookie token valid || no
      const jwtSecretToken = process.env.JWT_SECRET;
      jwt.verify(token, jwtSecretToken);
      //perbarui token
      const maxAge = 60 * 60
      var newToken = jwt.sign({ email: user.email }, jwtSecretToken, {
        expiresIn: maxAge
      });
  
     await Prisma.user.update({
        where: {
            email: user.email
        },
        data: {
            token: newToken
        }
    });
  
      //kirim cookie
      res.cookie('token', newToken) 
      //kalo ok ? next 
      next()
    } catch (error) {
      next(error)
  
  
    }
  }