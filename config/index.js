import dotenv from "dotenv"

dotenv.config()

export const {
    PORT,
    PORT_URL,
    DB_URL,
    JWT_SECRET
} = process.env