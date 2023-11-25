const express = require('express')
const router = express.Router();

const { newOrder,
		myOrders

	} = require('../controllers/orderController')
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth')

router.post('/order/new', isAuthenticatedUser, newOrder);
router.get('/orders/me', isAuthenticatedUser, myOrders);


module.exports = router;