const bcrypt = require("bcrypt")

// TODO: funcion para encriptar contraseña
const hashPasswordSync = (plainTextPwd) => {
  return bcrypt.hashSync(plainTextPwd, 10)
}

// TODO: funcion para comparar contraseñas para hacer el login
const comparePassword = (plainPassword, hashPassword, done) => {
  bcrypt.compare(plainPassword, hashPassword, done)
}

module.exports = {
  hashPasswordSync,
  comparePassword
}