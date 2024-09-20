const express = require('express')
const { register, verifyUser, logout, login, deleteUser } = require('../controllers/UserController')
const { authenticateUser } = require('../middlewares/UserMiddleware')
const router = express.Router()

router.post('/register', register)

router.get('/verify', verifyUser)

router.post('/logout',authenticateUser, logout)

router.post('/login', login)

router.delete('/delete/:id',authenticateUser, deleteUser)

module.exports = router