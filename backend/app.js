const express = require('express');
const app = express();
const cookie = require('cookie-parser')
const cors = require('cors')
const products = require('./routes/controller/productContoller');

const auth = require('./routes/auth')

app.use(cors({
    origin: "http://localhost:4012",
    methods: ["GET","POST","PUT","DELETE"], 
}))
app.use(express.json({limit:'50mb'}));

app.use(express.urlencoded({limit: "50mb", extended: true }));
app.use(cookie());

app.use('/api/v1', auth);
app.use('/api/v1',products);