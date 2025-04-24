import Address from "../models/Address.js"

//add address
export const addAddress = async(req,res)=>{
  try {
    const {address,userId}= req.body
    await Address.create({...address,userId})
    res.status(200).json({success:true,message:"Address added successfully"})
  } catch (error) {
    console.log(error.message)
    res.status(500).json({success:false,message:error.message})
  }
}

//get Address
export const getAddress = async(req,res)=>{
  try {
    const userId = req.userId
    const address = await Address.find({userId})
    res.json({success:true,address})
  } catch (error) {
    console.log(error.message)
    res.status(500).json({success:false,message:error.message})
  }
}