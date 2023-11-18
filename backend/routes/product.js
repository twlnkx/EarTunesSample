const express = require('express');
const router = express.Router();
const upload = require('../utils/multer')

const { newProduct} = require('../controllers/productController');

const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth')

router.post('/admin/product/new', upload.array('images', 10), newProduct)
router.get('/products', getProducts)

module.exports = router;