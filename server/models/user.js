module.exports = function (sequelize, DataTypes) {
  const User = sequelize.define('User', {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING
  })
  return User
}
