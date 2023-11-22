// import logo from './logo.svg';
// import './App.css';
import './App.css';
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
import { toast,  } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

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
        product: data.product._id,
        name: data.product.name,
        price: data.product.price,
        image: data.product.images[0].url,
        stock: data.product.stock,
        quantity: quantity
      }

      const isItemExist = state.cartItems.find(i => i.product === item.product)
      console.log(isItemExist, state)

      if (isItemExist) {
        setState({
          ...state,
          cartItems: state.cartItems.map(i => i.product === isItemExist.product ? item : i)
        })
      }
      else {
        setState({
          ...state,
          cartItems: [...state.cartItems, item]
        })
      }

      toast.success('Item Added to Cart', {
        position: toast.POSITION.BOTTOM_RIGHT
      })

    } catch (error) {
      toast.error(error, {
        position: toast.POSITION.TOP_LEFT
      });
      // navigate('/')
    }

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
          {/* <Route path="/me" element={<Profile />} exact="true" /> */}
          <Route path="/product/:id" element={<ProductDetails cartItems={state.cartItems} addItemToCart={addItemToCart} />} exact="true" />
        </Routes>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
