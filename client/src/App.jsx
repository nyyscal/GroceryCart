import React from 'react'
import {Routes,Route, useLocation} from "react-router-dom"
import NavBar from './components/NavBar'
import Home from "./pages/Home"
import {Toaster} from "react-hot-toast"
import Footer from './components/Footer'
import Login from './components/Login'
import { useAppContext } from './context/AppContext.jsx'
import AllProducts from './pages/AllProducts.jsx'
import ProductCategory from './pages/ProductCategory'
import ProductDetails from './pages/ProductDetails'
import Cart from './pages/Cart'
import AddAddress from './pages/AddAddress'
import MyOrders from './pages/MyOrders.JSX'
import SellerLogin from './components/seller/SellerLogin'
import SellerLayout from './pages/seller/SellerLayout'
import AddProduct from './pages/seller/AddProduct'
import ProductList from './pages/seller/ProductList'
import Orders from './pages/seller/Orders'
import Loading from './components/Loading'
const App = () => {
  const isSellerPath = useLocation().pathname.includes("seller")
  const {showUserLogin,isSeller} = useAppContext()
  return (
    <div className='text-defaukt min-h-screen text-gray-700 bg-white'>
      {isSellerPath ? null : <NavBar/>}
      {showUserLogin ?<Login/> : null}
      <Toaster/>
     <div className={`${isSellerPath ? "": "px-6 md:px-16 lg:px-24 xl:px-32"}`}>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/products" element={<AllProducts/>}/>
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/products/:category" element={<ProductCategory/>}/>
        <Route path="/products/:category/:id" element={<ProductDetails/>}/>
        <Route path="/add-address" element={<AddAddress/>}/>
        <Route path="/my-orders" element={<MyOrders/>}/>
        <Route path="loader" element={<Loading/>}/>
        <Route path="/seller" element={isSeller ? <SellerLayout/> :<SellerLogin/>}>
        <Route index element={isSeller ? <AddProduct/>:null}/>
        <Route path="product-list" element={<ProductList/>}/>
        <Route path="orders" element={<Orders/>}/>
        </Route>
      </Routes>
     </div>
     {isSellerPath ? null : <Footer/>}
    </div>
  )
}

export default App