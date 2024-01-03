import Joi from 'joi';

const loginValidate = Joi.object({
    email: Joi.string().email().required().label('email'),
    password: Joi.string().min(4).required().label('password')
})

export{
    loginValidate
}