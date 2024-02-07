import dotenv from "dotenv";
import { Prisma } from "../application/prisma.js";
import { Validate } from "../application/validate.js";
import { ResponseError } from "../error/responseError.js";
import { loginValidate } from "../validation/authValidate.js";
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
      throw new ResponseError(400, "Email is Invalid")
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
    res.status(200).json({
      data
    });
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

export default {
  login,
  logout,
};
