const crypt = require('../tools/crypt')
const uuid = require('uuid')

// * Cargando los modelos
const users = require('../database/models/init-models').initModels().users

// Cualquier usuario
const registerUser = async (data) => {
  // TODO: La contraseña tiene que estar encriptada con bcrypt
  const hashedPassword = crypt.hashPasswordSync(data.password)
  const userId = uuid.v4()

  // ? SQL Query: INSERT INTO users (uuid, ...data, password) values (...)
  const newUser = await users.create({
    uuid: userId,
    ...data,
    password: hashedPassword,
    role_id: 1
  })

  return{
    message: `User created succesfully with the id: ${userId}`,
    user: newUser
  }
}

// Solo administradores
const getAllUsers = async () => {
  
  // ? SELECT * FROM users
  const users = await users.findAll({
    attributes: {
      exclude: ["password"]
    }
  })

  return users
}

// Solo administradores
const getUserById = async (id) => {

  // ? SELECT user FROM users WHERE uuid = id
  const user = await users.findByPk(id, {
    attributes: {
      exclude: ["password"]
    }
  })

  return user
}

//clientes y administradores
const deleteUser = async (id) => {
  const user = await users.destroy({
      where: {
          id
      }
  })
  return {
      message: `User with id: ${id} deleted succesfully.`,
      user
  }
}

// cualquier rol
const editUser = async (id, data) => {
  const user = await users.update(data,{
      where: {
          id
      }
  })
  return {
      message: `User with id: ${id} eddited succesfully.`,
      user: user
  }
}

module.exports = {
  registerUser,
  getAllUsers,
  getUserById,
  deleteUser,
  editUser
}