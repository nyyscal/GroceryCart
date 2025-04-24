import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import User from "../models/User.js";

//Regitser User : /api/user/registration
export const regitser= async(req,res)=>{
  try {
    const {name,email,password}= req.body;
    if(!name || !email || !password){
      return res.status(400).json({success:false, message:"Please fill all fields"})
    }
    const existingUser = await User.findOne({email})
    if(existingUser){
      return  res.status(400).json({success:false, message:"User already exists."})
    }

    const hashedPassword = await bcrypt.hash(password,10);

    const user = await User.create({
      name,email,password:hashedPassword
    })

    const token = jwt.sign({id: user._id},process.env.JWT_SECRET, {expiresIn:"7d"})

    res.cookie("token",token,{
      httpOnly:true, //Prevent JS to access cookie
      secure: process.env.NODE_ENV==="production", //Set cookie only on HTTPS
      sameSite:process.env.NODE_ENV==="production"?"none":"strict",//Secure from CSRF
      maxAge: 7*24*60*60*1000 //7 days
    })

    return res.json({success:true,message:"User registered successfully",user:{email:user.email,name:user.name},token})

  } catch (error) {
    console.log(error.message)
    res.json({success:false,message:error.message})
  }
}

//Login User: /api/user.login
export const login = async(req,res) =>{
  try {
    const{email,password}= req.body
    if(!email || !password){
      return res.status(400).json({success:false, message:"Please fill all fields"})
    }
    const user = await User.findOne({
      email
    })
    if(!user){
      return res.status(400).json({success:false, message:"Invalid credentials"})
    }
    const isMatch = await bcrypt.compare(password,user.password)
    if(!isMatch){
      return res.status(400).json({success:false, message:"Invalid credentials"})
    }
    const token = jwt.sign({id: user._id},process.env.JWT_SECRET, {expiresIn:"7d"})

    res.cookie("token",token,{
      httpOnly:true, //Prevent JS to access cookie
      secure: process.env.NODE_ENV==="production", //Set cookie only on HTTPS
      sameSite:process.env.NODE_ENV==="production"?"none":"strict",//Secure from CSRF
      maxAge: 7*24*60*60*1000 //7 days
    })

    return res.json({success:true,message:"User loggedin successfully",user:{email:user.email,name:user.name},token})

  } catch (error) {
    console.log(error.message)
    res.json({success:false,message:error.message})
  }
}

import mongoose from "mongoose";

export const isAuth = async (req, res) => {
  try {
    console.log("💡 Looking for user with ID:", req.userId);

    // Ensure ID is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(req.userId)) {
      return res.status(400).json({ success: false, message: "Invalid user ID format" });
    }

    const user = await User.findById(req.userId).select("-password");

    if (!user) {
      console.log("❌ User not found in DB");
      return res.status(404).json({ success: false, message: "User not found" });
    }

    return res.json({ success: true, user });
  } catch (error) {
    console.log("🔥 Error in isAuth:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};


//Logout User : /api/user/logout
export const logout = async(req,res)=>{
  try {
   res.clearCookie("token",{
      httpOnly:true, //Prevent JS to access cookie
      secure: process.env.NODE_ENV==="production", //Set cookie only on HTTPS
      sameSite:process.env.NODE_ENV==="production"?"none":"strict",//Secure from CSRF
    })
    return res.json({success:true,message:"User logged out successfully!"})
  } catch (error) {
    console.log(error.message)
    res.json({success:false,message:error.message})
  }
} 