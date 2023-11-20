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


function App() {
  fetch("api/register",{
        headers: {
          "Content-Type": "application/json",
        },
        method: "post",
      });

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
        </Routes>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
