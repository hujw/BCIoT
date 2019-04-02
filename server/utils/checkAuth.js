const jwt = require('jsonwebtoken')
const models = require('../models')
const CustomError = require('./CustomError')
const {User} = models
let config = require('dotenv').config().parsed
module.exports = async function () {
  let {cookies: {token}} = this
  if (!token) throw new CustomError('no login', 401)
  const decoded = jwt.verify(token, config.SECRET)
  const {username} = decoded
  return username === config.ADMIN_USERNAME
}
