import Joi from "joi";

const loginValidate = Joi.object({
  email: Joi.string().email().required().label("Email"),
  password: Joi.string().min(4).required().label("Password"),
});

const updateUserValidation = Joi.object({
  name: Joi.string().required().label("Name"),
  email: Joi.string().email().required().label("Email"),
  password: Joi.string().min(4).required().label("Password"),
  confirm_password: Joi.string()
    .min(4)
    .required()
    .label("Password")
    .valid(Joi.ref("password"))
    .label("Password Confirm")
    .options({
      messages: {
        "any.only": "{{#label}} does not match",
      },
    }),
});

export { loginValidate, updateUserValidation };
