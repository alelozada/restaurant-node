const crypt = require('../tools/crypt')
const uuid = require('uuid')
const sequelize = require('../database/models/index')
const initModels = require('../database/models/init-models')

// * Cargando los modelos
const models = initModels(sequelize)

// Cualquier usuario
const registerUser = async (data) => {
  // TODO: La contraseña tiene que estar encriptada con bcrypt
  const hashedPassword = crypt.hashPasswordSync(data.password)
  const userId = uuid.v4()

  // ? SQL Query: INSERT INTO users (uuid, ...data, password) values (...)
  const newUser = await models.users.create({
    uuid: userId,
    ...data,
    password: hashedPassword
  })

  return{
    message: `User created succesfully with the id: ${userId}`,
    user: newUser
  }
}

// Solo administradores
const getAllUser = async () => {
  
  // ? SELECT * FROM users
  const users = await models.users.findAll({
    attributes: {
      exclude: ["password"]
    }
  })

  return users
}

// Solo administradores
const getUserById = async (id) => {

  // ? SELECT user FROM users WHERE uuid = id
  const user = await models.users.findByPk(id)

  return user
}

// Clientes & administradores
const deleteUser = (id) => {

}

// cualquier rol
const editUser = (id, data) => {

}

module.exports = {
  registerUser,
  getAllUser,
  getUserById
}