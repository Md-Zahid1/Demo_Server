import express from "express"

import auth from "../middleware/auth.js"
import { deleteProfile, getUser, login, profile, register, updateProfile } from "../controller/user.controller.js"
import { imageUpload } from "../controller/imageUpload.controller.js"


const router = express.Router()

router.post("/register", register)
router.post("/login", login)
router.get("/profile", auth, profile)
router.get("/get-user", getUser)
router.post("/update-profile", updateProfile)
router.post("/delete-profile", deleteProfile)
router.post("/image-upload", imageUpload)

export default router