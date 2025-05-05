const express = require('express');
const router = express.Router();
const { createUser, getUsers, updateUser, deleteUser } = require('../controllers/controller');
const { authenticateToken } = require('../middlewares/authenticateToken');
const { authorizeAdmin } = require('../middlewares/authorizeAdmin');

router.get('/', authenticateToken, getUsers);

router.post('/', authenticateToken, authorizeAdmin, createUser);

router.put('/:id', authenticateToken, authorizeAdmin, updateUser);

router.delete('/delete/:id', authenticateToken, authorizeAdmin, deleteUser);



module.exports = router;