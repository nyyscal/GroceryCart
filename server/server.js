import cookieParser from "cookie-parser";
import cors from "cors"
import express from "express"
import connectDB from "./configs/db.js";
import "dotenv/config"
import dotenv from 'dotenv';
import userRouter from "./routes/userRoute.js";
import sellerRouter from "./routes/sellerRoute.js";
import connectCloudinary from "./configs/clouinary.js";
import productRouter from "./routes/productRoute.js";
import cartRouter from "./routes/cartRoute.js";
import addressRouter from "./routes/addressRoute.js";
import orderRouter from "./routes/orderRoute.js";
import { stripeWebhooks } from "./controllers/orderController.js";
const app = express();
const PORT = process.env.PORT || 4000;

dotenv.config();

//Allow multiple origin
const allowedOrigins=[
  "http://localhost:5173",
]

app.post("/stripe",express.raw({type:"application/json"}),stripeWebhooks)

await connectDB()
await connectCloudinary()

//Middleware Config
app.use(express.json())
app.use(cookieParser())
app.use(cors({origin:allowedOrigins,credentials:true}))

app.get("/",(req,res)=>res.send("API is Working!"))
app.use("/api/user",userRouter)
app.use("/api/seller",sellerRouter)
app.use("/api/product",productRouter)
app.use("/api/cart",cartRouter)
app.use("/api/address",addressRouter)
app.use("/api/order",orderRouter)

app.listen(PORT,()=>{
  console.log(`Server is running on  http://localhost:${PORT}`)

;
})