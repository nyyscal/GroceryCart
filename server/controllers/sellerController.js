import jwt from "jsonwebtoken"

// api/seller/login
export const sellerLogin= async(req,res)=>{
  const {email,password} = req.body

  try {
    if(password === process.env.SELLER_PASSWORD && email ===process.env.SELLER_EMAIL){
      const token = jwt.sign( { id: "admin", email },process.env.JWT_SECRET,{expiresIn:"7d"})
      res.cookie("sellerToken",token,{
        httpOnly:true,
        secure: process.env.NODE_ENV==="production",
        sameSite:process.env.NODE_ENV==="production"?"none":"strict",
        maxAge: 7*24*60*60*1000
      })
      return res.json({success:true,message:"Seller logged in successfully",token})
    }else{
      return res.json({success:false,message:"Invalid credentials"})
    }
  } catch (error) {
    console.log(error.message)
    res.json({success:false,message:error.message})
  }
}

//Seller Auth

export const isSellerAuth = async(req,res)=>{
  try {
    return res.json({success:true,message:"Seller is authenticated"})
  } catch (error) {
    console.log(error.message)
    res.json({success:false,message:error.message})
  }
}

//Logout Seller : /api/seller/logout
export const sellerLogout = async(req,res)=>{
  try {
   res.clearCookie("sellerToken",{
      httpOnly:true, //Prevent JS to access cookie
      secure: process.env.NODE_ENV==="production", //Set cookie only on HTTPS
      sameSite:process.env.NODE_ENV==="production"?"none":"strict",//Secure from CSRF
    })
    return res.json({success:true,message:"Seller logged out successfully!"})
  } catch (error) {
    console.log(error.message)
    res.json({success:false,message:error.message})
  }
} 