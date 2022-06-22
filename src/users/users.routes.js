// ? Dependencies
const router = require('express').Router()
const userHttpHandler = require('./users.http')

// ? Import files
const config = require('../config')

// ? Rutas protegidas
const passport = require('passport')
require('../tools/auth')(passport)


router.route('/')
  // .get(userHttpHandler.getAllUsers)
  .get(passport.authenticate('jwt', config.jwtSecret), userHttpHandler.getAllUsers)

module.exports = {
  router
}