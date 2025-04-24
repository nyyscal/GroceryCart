//Update user cart data

import User from "../models/User.js"

export const updateCart = async(req,res)=>{
  try{
   const {userId, cartItems} = req.body
   await User.findByIdAndUpdate(userId, {cartItems})
    res.status(200).json({success:true, message:"Cart updated successfully"})
   } catch (error) {
    res.status(500).json({success:false, message:"Server error"})
   }
}