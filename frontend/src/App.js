// import logo from './logo.svg';
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useState } from "react";
import Header from "./Components/Layout/Header";
import Footer from "./Components/Layout/Footer";
import Home from "./Components/Home";
import Register from './Components/User/Register';
import Login from './Components/User/Login';
import NewProduct from './Components/Admin/newProduct';
import ProductDetails from './Components/Product/ProductDetails';
import axios from 'axios';
import { toast} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Cart from './Components/Cart/Cart';
import Shipping from './Components/Cart/Shipping';
import ConfirmOrder from './Components/Cart/ConfirmOrder';
import Payment from "./Components/Cart/Payment";
import OrderSuccess from "./Components/Cart/OrderSuccess";
import ListOrders from './Components/Order/ListOrders';
import OrderDetails from './Components/Order/OrderDetails';
import ProtectedRoute from './Components/Routes/ProtectedRoute';
import OrdersList from './Components/Admin/OrdersList';
import ProcessOrder from './Components/Admin/ProcessOrder';
import ProductsList from "./Components/Admin/ProductsList";
import Dashboard from "./Components/Admin/Dashboard";
import UsersList from './Components/Admin/UsersList';
import UpdateUser from './Components/Admin/UpdateUser';
import Profile from './Components/User/Profile';
import UpdateProfile from './Components/User/UpdateProfile';


function App() {
  // fetch("api/register",{
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       method: "post",
  //     });

  const [state, setState] = useState({
    cartItems: localStorage.getItem('cartItems')
      ? JSON.parse(localStorage.getItem('cartItems'))
      : [],
    shippingInfo: localStorage.getItem('shippingInfo')
      ? JSON.parse(localStorage.getItem('shippingInfo'))
      : {},
  })

  const addItemToCart = async (id, quantity) => {
    console.log(id, quantity)
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/${id}`)
      const item = {
        product: data._id,
        name: data.name,
        price: data.price,
        image: data.images[0].url,
        stock: data.stock,
        quantity: quantity
      }

      const isItemExist = state.cartItems.find(i => i.product === item.product)
      console.log(isItemExist, state)

      if (isItemExist) {
        setState({
          ...state,
          cartItems: state.cartItems.map(i => i.product === isItemExist.product ? item : i)
        })
        console.log("exists") //true
      }else {
        setState({
          ...state,
          cartItems: [...state.cartItems, item]
        })
        console.log("doesnot exists")
      }

      toast.success('Item Added to Cart', {
        position: toast.POSITION.BOTTOM_RIGHT
      })
      console.log("cart done")
      
    } catch (error) {
      toast.error(error, {
        position: toast.POSITION.TOP_LEFT
      });
      // navigate('/')
      console.log("aint done",error)
    }

  }
  const removeItemFromCart = async (id) => {
    setState({
      ...state,
      cartItems: state.cartItems.filter(i => i.product !== id)
    })
  }

  const saveShippingInfo = async (data) => {
    setState({
      ...state,
      shippingInfo: data
    })
    localStorage.setItem('shippingInfo', JSON.stringify(data))
  }

  return (
    <div className="App">
    <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} exact="true" />
          <Route path="/register" element={<Register />} exact="true" />
          <Route path="/login" element={<Login />} exact="true" />
          <Route path="/admin/product" element={<NewProduct />} exact="true" />
          <Route path="/me" element={<Profile />} exact="true" />
          <Route path="/me/update" element={<UpdateProfile />} exact="true" />
          <Route path="/product/:id" element={<ProductDetails cartItems={state.cartItems} addItemToCart={addItemToCart} />} exact="true" />
          <Route path="/cart" element={<Cart cartItems={state.cartItems} addItemToCart = {addItemToCart} removeItemFromCart = {removeItemFromCart}/>} exact="true" />
          <Route path="/shipping" element={<Shipping shipping={state.shippingInfo} saveShippingInfo={saveShippingInfo} />} />
          <Route path="/confirm" element={<ConfirmOrder cartItems={state.cartItems} shippingInfo={state.shippingInfo} />} />
          <Route path="/payment" element={<Payment cartItems={state.cartItems} shippingInfo={state.shippingInfo} />} />
          <Route path="/success" element={<OrderSuccess />} />
          <Route path="/orders/me" element={<ListOrders />} />
          <Route path="/order/:id" element={<OrderDetails />} />
          <Route path="/admin/orders" element={<ProtectedRoute isAdmin={true}><OrdersList /> </ProtectedRoute>}/>
          <Route path="/admin/order/:id" element={<ProcessOrder />} />
          <Route path="/admin/products" element={<ProtectedRoute isAdmin={true}><ProductsList /></ProtectedRoute>}/>
          <Route path="/dashboard" element={<ProtectedRoute isAdmin={true}><Dashboard /></ProtectedRoute>}/>
          <Route path="/admin/users" element={ <ProtectedRoute isAdmin={true}> <UsersList /></ProtectedRoute>}/>
          <Route path="/admin/user/:id" element={<UpdateUser />} />

        </Routes>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
