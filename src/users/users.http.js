const usersController = require('./users.controller')

/*
  TODO:
  ? get       /users ADMIN
  ? get       /users/:id ADMIN
  ? delete    /users/me CLIENTE
  ? delete    /users/:id ADMIN
  ? put-patch /users/me CLIENTE USUARIO
  ? put-patch /users/:id ADMIN
*/

const getAllUsers = async (req, res) => {
  if (req.user.rol !== 'admin') {
    res.status(401).json({
      status: 401,
      message: "You don't have permissions to make this request"
    })
  }
  const users = await usersController.getAllUsers()
  res.status(200).json(users)
}

const getUserById = async (req, res) => {
  
}

module.exports = {
  getAllUsers
}