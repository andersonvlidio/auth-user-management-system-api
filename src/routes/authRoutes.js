const express = require('express');
const router = express.Router();
const { login, getProfile } = require('../controllers/controller');
const { authenticateToken } = require('../middlewares/authenticateToken');
const { authorizeAdmin } = require('../middlewares/authorizeAdmin');

router.post('/login', login);

router.get('/me', authenticateToken, getProfile);

router.get('/profile/:id', authenticateToken, authorizeAdmin, getProfile);


module.exports = router;
