import mongoose from "mongoose";

const schema = new mongoose.Schema({
    image: String
}, { timestamps: true })

export const ImageUploadModel = mongoose.model("image-upload", schema)