const express = require('express')
const router = express.Router();

const {newSeller,allSellers} = require('../controllers/sellerController')
const {isAuthenticatedUser,authorizeRoles} = require('../middlewares/auth')

router.post('/admin/seller/new',isAuthenticatedUser,authorizeRoles('admin'), newSeller);
router.get('/admin/sellers', isAuthenticatedUser, authorizeRoles('admin'), allSellers);

module.exports = router;