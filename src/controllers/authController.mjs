import { getUserByEmail } from "../models/userModel.mjs"
import bcrypt from "bcryptjs"
import { tokenize } from "../utils/tokenGenerator.mjs"
import { userResource } from "../resources/userResource.mjs"

export const register = async (req,res) => {
}



export const login = async (req,res) => {

    const inputs = req.body

    let user = await getUserByEmail(inputs.email).then((user) => {
        if(!user){
            res.status(404).send({
                message: "User not found"
            })
            return false
        }
        return user
    })
    .catch((err) => {
        console.log(err)
        res.status(500).send({
            message: "Error getting user"
        })
        return false
    })

    if(!user) return

    const passwordMatch = await bcrypt.compare(inputs.password, user.password)
    .then((match) => {
        if(!match){
            return false
        }
        return true
    })

    if(!passwordMatch) {
        res.status(403).send({
            message: "Invalid credentials"
        })

        return
    }
    user = userResource(user);

    const token = tokenize(user)

    res.send({
        data: userResource(user),
        token: token
    })
}