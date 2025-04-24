import React, { useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import { useAppContext } from '../context/AppContext.jsx'
import toast from 'react-hot-toast';

const InputField = ({type,placeholder,name,handleChange,address})=>(
  <input className='w-full px-2 py-2.5 border border-gray-500/30 rounded outline-none text-gray-500 focus:border-primary transition' type={type} placeholder={placeholder} onChange={handleChange} name={name} value={address[name]} requried />
)

const AddAddress = () => {
  const [address,setAddress] = useState({
    firstName:"",
    lastName:"",
    email:"",
    street:"",
    city:"",
    state:"",
    zipcode:"",
    country:"",
    phone:""
  })
  const {axios,user,navigate} = useAppContext();
  
  const handleChange = (e)=>{
    const {name,value} = e.target
    setAddress((prevAddress)=>({
        ...prevAddress,
        [name]:value,
    }))
    }
  
  const onSubmitHandler =async(e)=>{
    e.preventDefault();
    try {
      const {data} = await axios.post("/api/address/add",{ userId: user._id,address})
      if(data.success){
        toast.success(data.message)
        navigate("/cart")
      }else{
        toast.error(data.message) 
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(()=>{
    if(!user){
      navigate("/cart")
      toast.error("Please login to add address")
    }
  },[])
 
  return (
    <div className='mt-16 pb-16'>
      <p className='text-2xl md:text-3xl text-gray-500'>Add Shipping <span className='text-primary font-semibold'>Address</span></p>
      <div className='flex flex-col-reverse md:flex-row justify-between mt-10'>
        <div className='flex-1 max-w-md'>
          <form onSubmit={onSubmitHandler} className='space-y-3 mt-6 text-sm'>
            <div className='grid grid-cols-2 gap-4'>
              <InputField address={address} name="firstName" type="text" placeholder="First Name" handleChange={handleChange}/>
              <InputField address={address} name="lastName" type="text" placeholder="Last Name" handleChange={handleChange}/>
            </div>
            <InputField address={address} name="email" type="email" placeholder="Email" handleChange={handleChange}/>
            <InputField address={address} name="street" type="text" placeholder="Street" handleChange={handleChange}/>
            <div className='grid grid-cols-2 gap-4'>
              <InputField address={address} name="city" type="text" placeholder="City " handleChange={handleChange}/>
              <InputField address={address} name="state" type="text" placeholder="State" handleChange={handleChange}/>
            </div>
            <div className='grid grid-cols-2 gap-4'>
              <InputField address={address} name="zipcode" type="number" placeholder="Zip Code " handleChange={handleChange}/>
              <InputField address={address} name="country" type="text" placeholder="Country" handleChange={handleChange}/>
            </div>
            <InputField address={address} name="phone" type="text" placeholder="Phone" handleChange={handleChange}/>

            <button className='w-full mt-6 bg-primary text-white py-3 hover:bg-primary-dull transition cursor-pointer uppercase'>Save Address</button>

          </form>
        </div>
        <img src={assets.add_address_iamge} alt="address"  className='md:mr-16 mb-16 md:mt-0'/>
      </div>
    </div>
  )
}

export default AddAddress