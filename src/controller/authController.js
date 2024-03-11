import dotenv from "dotenv";
import { Prisma } from "../application/prisma.js";
import { Validate } from "../application/validate.js";
import { ResponseError } from "../error/responseError.js";
import {
  loginValidate,
  updateUserValidation,
  createFirstUserValidation,
} from "../validation/authValidate.js";
import bcrypt from "bcrypt";
import authService from "../services/authService.js";

const login = async (req, res, next) => {
  try {
    //ambil data > email && password
    let loginData = req.body;
    const { email, password } = Validate(loginValidate, loginData);

    //check email (in databse or not)
    const user = await Prisma.user.findUnique({
      where: { email },
    });
    //check email
    if (!user) {
      throw new ResponseError(400, "Email is Invalid");
    }

    //check password/compare password
    const dbPass = user.password;
    const checkPass = await bcrypt.compare(password, dbPass);

    if (!checkPass) throw new ResponseError(400, "Password is Invalid");

    //create token
    const token = authService.createToken(res, email);

    //update token
    const data = await authService.updateUserToken(email, token);
    //ambil datauser
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    //UPDATE DATA USER
    const user = req.user;
    await Prisma.user.update({
      where: { email: user.email },
      data: { token: null },
      select: { email: true },
    });
    //bikin token umur 1 detik
    authService.createToken(res, user.email, "1s");

    //reset cookies
    res.clearCookie("token");

    //send data success
    res.status(200).json({
      message: "logout success",
    });
  } catch (error) {
    next(error);
  }
};

const getUser = async (req, res, next) => {
  try {
    const user = await Prisma.user.findFirstOrThrow({
      select: {
        name: true,
        email: true,
      },
    });

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

const editPass = async (req, res, next) => {
  try {
    let data = req.body;
    //validate
  data = Validate(updateUserValidation, data);

    const currentUser = await Prisma.user.findFirstOrThrow();
    //jika data.passwordnya ada, maka update password
    if (data.current_password) {
      const checkPass = await bcrypt.compare(
        data.current_password,
        currentUser.password
      );
      // TODO ganti Current Password is invalid > password is invalid
      if (!checkPass)
        throw new ResponseError(400, "Current Password is Invalid");

      //remove confirm password
      delete data.current_password;
      delete data.confirm_password;
      //update pass to hash
      data.password = await bcrypt.hash(data.password, 10);
      console.log(currentUser);
    }

    const updatedUser = await Prisma.user.update({
      where: { email: currentUser.email },
      data,
      select: {
        name: true,
        email: true,
      },
    });
    res.status(200).json(updatedUser);

    //check current password
    //check new password & confirm password <- password.value ? newPassword.value
  } catch (error) {
    next(error);
    next(error);
  }
};

const createFirstUser = async (req, res, next) => {
  try {
    //cek apakah user ada di database
    const checkUser = await Prisma.user.findFirst();

    if (checkUser) {
      res.status(403).json({
        message: "User already exists"
      })

      next();
    }
    else{
      //validasi
      const data = Validate(createFirstUserValidation, req.body);

      //buang comfirm passeord
      delete data.confirm_password;

      //enkripsi password
      data.password = await bcrypt.hash(data.password, 10);

      //create user
      const user = await Prisma.user.create({
        data,
        select: {
          name: true,
          email: true,
        },
      });
      //create user
      res.status(200).json(user);
    }
  } catch (error) {
    next(error);
    
  }
};
const isUserExist = async (req, res, next) => {
  try {
    const user = await Prisma.user.findFirst();
    if (user) {
      res.status(200).json({
        isExist: user ? true : false
      });
      
    } else {
      res.status(200).json(false);
    }
  } catch (error) {
    next(error);
  }
};

export default {
  login,
  logout,
  createFirstUser,
  isUserExist,
  getUser,
  editPass,
};
