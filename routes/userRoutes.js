const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');

// Public routes
router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/forgot-password', userController.forgotPassword);
router.post('/reset-password', userController.resetPassword);

// Protected routes
router.post('/refresh-token', auth, userController.refreshToken);
// Example protected route (add more as needed)
router.get('/profile', auth, (req, res) => {
  res.json({ message: 'This is a protected profile route', user: req.user });
});

module.exports = router;
