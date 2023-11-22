const express = require('express');
const router = express.Router();
const upload = require('../utils/multer')

const { newProduct, 
        getProducts,
        getSingleProduct } = require('../controllers/productController');

const { isAuthenticatedUser, 
        authorizeRoles } = require('../middlewares/auth')

router.post('/admin/product/new',isAuthenticatedUser,authorizeRoles('admin'),upload.array('images', 10), newProduct)
router.get('/products', getProducts)
router.get('/product/:id', getSingleProduct);

module.exports = router;