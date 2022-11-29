import Joi from "joi"

export const validateSignupData = async (data) => {
    const schema = Joi.object({
        firstName: Joi.string().min(1).max(50).required(),
        lastName: Joi.string().min(1).max(50).required(),
        email: Joi.string().email({ tlds: { allow: false } }).required(),
        password: Joi.string().min(6).required(),
        role: Joi.any().valid("client", "lawyer"),
        remember: Joi.string().allow(''),
    })
    try {
        await schema.validateAsync(data);
        return { status: true, message: null }
    } catch (err) {
        return { status: false, message: err.details[0].message }

    }
}

export const validateSigninData = async (data) => {

    const schema = Joi.object({
        email: Joi.string().email({ tlds: { allow: false } }).required(),
        password: Joi.string().min(6).required(),
    })
    try {
        await schema.validateAsync(data);
        return { status: true, message: null }
    } catch (err) {
        return { status: false, message: err.details[0].message }

    }
}

export const validateForgetPasswordData = async (data) => {

    const schema = Joi.object({
        email: Joi.string().email({ tlds: { allow: false } }).required(),
    })
    try {
        await schema.validateAsync(data);
        return { status: true, message: null }
    } catch (err) {
        return { status: false, message: err.details[0].message }

    }
}

export const validateResetPasswordData = async (data) => {

    const schema = Joi.object({
        password: Joi.string().min(6).required(),
        confirmPassword: Joi.any().valid(Joi.ref('password')).required(),
    })
    try {
        await schema.validateAsync(data);
        return { status: true, message: null }
    } catch (err) {
        return { status: false, message: err.details[0].message }

    }
}
