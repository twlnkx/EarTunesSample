const express = require('express');
const app = express();
const cookie = require('cookie-parser')
const cors = require('cors')
// const products = require('./routes/controller/productContoller');
const products = require("./routes/product");
const auth = require('./routes/auth')

// app.use(function(req,res,next){
//     res.set({
//         "Access-Control-Allow-Origin": "http://localhost:4012",
//         "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS" 
//     })
// })
app.use(cors())
app.use(express.json({limit:'50mb'}));

app.use(express.urlencoded({limit: "50mb", extended: true }));
app.use(cookie());

app.use('/api/v1', auth);
app.use('/api/v1',products);

module.exports = app;