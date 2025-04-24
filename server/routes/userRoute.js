import express from "express"
import { isAuth, login, logout, regitser } from "../controllers/userController.js"
import authUser from "../middlewares/authUser.js"
const userRouter = express.Router()

userRouter.post("/register",regitser)
userRouter.post("/login",login)
userRouter.get("/is-auth",authUser,isAuth)
userRouter.get("/logout",logout)

export default userRouter