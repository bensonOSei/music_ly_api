import { userResource } from "../resources/userResource.mjs"
import { verifyToken } from "../utils/tokenGenerator.mjs"

export const authenticate = async (req, res, next) => {
    // check if token exists in x-access-token
    const token = req.headers['x-access-token']
    if(!token) {
        res.status(401).send({
            message: "unauthenticated"
        })
        return
    }

    const decoded = verifyToken(token)

    if (!decoded) {
        res.status(403).send({
            message: "Invalid signature"
        })
        return
    }
    req.user = userResource(decoded)
    next()
}