import { ImageUploadModel } from '../model/ImageUpload.model.js'

import multer from 'multer'
import path from 'path'


const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`
        cb(null, uniqueName);
    }
})


const handleMultipartData = multer({ storage, limits: { fileSize: 1000000 * 5 } }).single('image')


export const imageUpload = (req, res, next) => {
    handleMultipartData(req, res,
        async (err) => {
            if (err) { return res.status(500).json({ message: err.message }) }

            const filePath = req.file.path

            try {
                const document = await ImageUploadModel.create({
                    image: filePath
                })

                return res.status(201).json({
                    message: "Image Created",
                    result: document
                })

            } catch (err) {
                return res.status(500).json({
                    message: err.message,
                    error: err
                })
            }
        });
}