import mongoose from "mongoose"

const schema = new mongoose.Schema({
    name: String,
    email: String,
    image: String,
    password: String
}, { timestamps: true })

export const UserModel = mongoose.model("user", schema)