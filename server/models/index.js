let fs = require('fs')
let path = require('path')
let Sequelize = require('sequelize')
let env = process.env.NODE_ENV || 'dev'
let config = require(path.join(__dirname, '..', 'config', 'DatabaseConfig.js'))[env]

let sequelize = new Sequelize(config.database, config.username, config.password, {
  ...config,

  operatorsAliases: Sequelize.Op
})

let db = {}

fs
  .readdirSync(__dirname)
  .filter(function (file) {
    return (file.indexOf('.') !== 0) && (file !== 'index.js')
  })
  .forEach(function (file) {
    let model = sequelize.import(path.join(__dirname, file))
    db[model.name] = model
  })

Object.keys(db).forEach(function (modelName) {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db)
  }
})

db.sequelize = sequelize
db.Sequelize = Sequelize
db.Op = Sequelize.Op

module.exports = db
