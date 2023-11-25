const express = require('express')
const router = express.Router();

const { newOrder, myOrders, getSingleOrder, 
		allOrders, 

	  } = require('../controllers/orderController')
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth')

router.post('/order/new', isAuthenticatedUser, newOrder);
router.get('/orders/me', isAuthenticatedUser, myOrders);
router.get('/order/:id', isAuthenticatedUser, getSingleOrder);
router.get('/admin/orders/', isAuthenticatedUser, authorizeRoles('admin'), allOrders);

module.exports = router;