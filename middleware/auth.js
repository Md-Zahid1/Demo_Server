import { JWT_SECRET } from "../config/index.js"
import jwt from "jsonwebtoken"



const auth = async (req, res, next) => {
    const authHeader = req.headers.authorization

    if (!authHeader) {
        return res.status(401).json({ message: "User Not Found" })
    }

    const token = authHeader.split(' ')[1]

    try {
        const { _id, name, email } = jwt.verify(token, JWT_SECRET)
        const user = { _id, name, email }
        req.user = user
        next()
    } catch (err) {
        return res.status(500).json({
            message: err.message,
            error: err
        })
    }
}

export default auth