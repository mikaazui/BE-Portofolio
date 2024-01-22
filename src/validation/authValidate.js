import Joi from 'joi';

const loginValidate = Joi.object({
    email: Joi.string().email().required().label('Email'),
    password: Joi.string().min(4).required().label('Password')
})

export{
    loginValidate
}