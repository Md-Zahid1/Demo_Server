import express from "express"
import { DB_URL, PORT } from "./config/index.js"
import mongoose from "mongoose"
import router from "./router/index.js"
import cors from "cors"


const app = express()

app.use(cors())
app.use(express.json())
app.use("/", router)
app.use('/uploads', express.static('uploads'))


mongoose.connect(DB_URL)
    .then(() => { console.log('databaseconnected') })

app.listen(PORT, () => {
    console.log(`server is runing on ${PORT}`)
})