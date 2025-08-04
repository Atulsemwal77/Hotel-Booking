import express from "express"
import "dotenv/config"
import cors from "cors"
import connectDb from "./configs/db.js"
import { clerkMiddleware } from '@clerk/express'
import clerkWebHooks from "./controllers/clerkWebHooks.js"
import userRouter from "./routes/userRoute.js"


connectDb()
const app = express()

app.use(cors())

// Middleware
app.use(express.json())
app.use(clerkMiddleware())

// API to listien to clerk Webhook
app.use('/api/clerk', clerkWebHooks);

app.get('/' , (req , res)=>{
    res.send("API is working")
})
app.use('/api/user', userRouter)

const PORT = process.env.PORT ||3000 ;

app.listen(PORT, ()=>{
   console.log(`Server running on port ${PORT}`)
})