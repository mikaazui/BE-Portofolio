import Joi from "joi";
import { ResponseError } from "../error/responseError.js";

export const errorMid = ((error, req, res, next) => {
    if (!error) {
      return next()
    }
    //response error
    if (error instanceof ResponseError) {
      res.status(error.status).json({
        message: error.message
      }).end();
      return;
    }
    //joi error
    if (error instanceof Joi.ValidationError) {
      res.status(400).json({
        message: error.message
      }).end();
      return;
    }
    //server error
      res.status(500).json({
        message: 'server error' + error.message,
        log: console.log(error)
      })
    }
  
  )