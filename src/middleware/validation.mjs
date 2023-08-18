import { Validator } from "node-input-validator"


export const validate = (options) => {
    return async (req,res,next) => {
        const validate = new Validator(req.body,options)
        validate.check().then((matched) => {
            if(!matched){
                res.status(422).send({
                    message: "Validation failed",
                    errors: validate.errors
                })
                return
            }
            next()
        })
    }
}

export const validateLogin = validate({
    email: "required|email",
    password: "required"
})

export const validateRegister = validate({
    firstName: "required",
    lastName: "required",
    email: "required|email",
    password: "required|minLength:8",
    confirmPassword: "required|same:password"
})
