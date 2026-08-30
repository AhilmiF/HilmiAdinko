const express = require('express');
const router = express.Router();
const { loginAdmin, verifySession, getDashboardStats } = require('../controller/adminController');
const { verifyAdminToken } = require('../middleware/auth');

router.post('/login', loginAdmin);
router.get('/verify', verifySession);
router.get('/stats', verifyAdminToken, getDashboardStats);

module.exports = router;
