const express = require('express')

const UserController = require('../controllers/User')

const checkAuth = require('../middleware/check-auth')

const routes = express.Router()

routes.post('/signup', UserController.user_signup)

routes.post('/login', UserController.user_login)

routes.get('/:_id', checkAuth, UserController.user_get)

routes.put('/:id', checkAuth, UserController.user_update)

module.exports = routes;