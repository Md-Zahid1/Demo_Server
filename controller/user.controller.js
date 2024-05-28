import { UserModel } from "../model/User.model.js"
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"
import { JWT_SECRET } from "../config/index.js"



export const register = async (req, res, next) => {
    console.log("body", req.body)

    try {
        const exist = await UserModel.exists({ email: req.body.email })

        if (exist) {
            return res.status(409).json({ message: "Email Allready Exist" });
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const user = await UserModel.create({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        })

        return res.status(201).json({
            message: "User Register",
            result: user
        })

    } catch (err) {
        return res.status(500).json({
            message: err.message,
            error: err
        })
    }
}


export const login = async (req, res, next) => {
    try {
        const user = await UserModel.findOne({ email: req.body.email })

        if (!user) {
            return res.status(401).json({ message: "User Not Found" })
        }

        const compare = bcrypt.compare(req.body.password, user.password)

        if (!compare) {
            return res.status(401).json({ message: "Username OR Password Wrong!" });
        }

        const jwtToken = jwt.sign({ _id: user._id, email: user.email, user: user.name }, JWT_SECRET, { expiresIn: '1h' });

        return res.status(201).json({
            message: "Login",
            result: jwtToken
        })
    } catch (err) {
        return res.status(500).json({
            message: err.message,
            error: err
        })
    }
}


export const profile = async (req, res, next) => {
    try {
        const Profile = await UserModel.findById({ _id: req.user._id })
        return res.status(201).json({
            message: "Profile",
            result: Profile
        })
    } catch (err) {
        return res.status(500).json({
            message: err.message,
            error: err
        })
    }
}


export const updateProfile = async (req, res, next) => {
    try {
        const exists = await UserModel.exists({ _id: req.body._id })

        if (!exists) {
            return res.status(409).json({ message: "Nothing To Update" })
        }

        const profile = await UserModel.findByIdAndUpdate(req.body._id, req.body, { new: true })

        return res.status(201).json({
            message: "Profile Updated Successfully",
            result: profile
        })
    } catch (err) {
        return res.status(500).json({
            message: err.message,
            error: err
        })
    }

}


export const deleteProfile = async (req, res, next) => {
    try {
        const exists = await UserModel.exists({ _id: req.body._id })
        if (!exists) {
            return res.status(409).json({ message: "Nothing To Delete" })
        }
        const profile = await UserModel.findByIdAndDelete(req.body._id, { new: true })
        return res.status(201).json({
            message: "Profile Deleted Successfully",
            result: profile
        })
    } catch (err) {
        return res.status(500).json({
            message: err.message,
            error: err
        })
    }
}


export const getUser = async (req, res, next) => {
    try {
        const profile = await UserModel.find({
            $or: [
                { "name": { $regex: `^${req.query.search}`, $options: 'i' } },
                { "email": { $regex: `^${req.query.search}`, $options: 'i' } }
            ]
        }).limit(req.query.limit).skip((req.query.page * req.query.limit) - req.query.limit)
        return res.status(201).json({
            message: "Profile",
            result: profile
        })
    } catch (err) {
        return res.status(500).json({
            message: err.message,
            error: err
        })
    }
}

