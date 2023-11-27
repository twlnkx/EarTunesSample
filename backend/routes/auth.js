const express = require('express');
const router = express.Router();
const upload = require("../utils/multer");

const {registerUser, loginUser, logout,
       allUsers , getUserDetails, deleteUser,
       updateUser, getUserProfile, updateProfile} = require('../controllers/authController');

const {isAuthenticatedUser,authorizeRoles} = require('../middlewares/auth')

router.post('/register', upload.single("avatar"), registerUser);
router.post('/login',loginUser);
router.get('/logout', logout);
router.get('/me', isAuthenticatedUser, getUserProfile)
router.put('/me/update', isAuthenticatedUser, updateProfile)
router.get('/admin/users', isAuthenticatedUser, authorizeRoles('admin'), allUsers)
router.route('/admin/user/:id').get(isAuthenticatedUser,authorizeRoles('admin'), getUserDetails ).delete(isAuthenticatedUser,authorizeRoles('admin'), deleteUser).put(isAuthenticatedUser,authorizeRoles('admin'),  updateUser)
module.exports = router;