let models = require('../models')
let express = require('express')
let CustomError = require('../utils/CustomError')
let ErrorDecorator = require('../utils/ErrorDecorator')
let jwt = require('jsonwebtoken')
let router = express.Router()
let config = require('dotenv').config().parsed
const {User, Op} = models
router.post('/login', ErrorDecorator(async (req, res) => {
  console.log(req.body)
  const {username, password} = req.body
  const user = await User.findOne({
    where: {
      username: {
        [Op.eq]: username
      }
    }
  })
  if (!user || password !== user.password) {
    res.status(400).json({error: 'User not found or Wrong Password!'})
  }
  const payload = {
    username
  }
  const options = {
    expiresIn: '1d'
  }
  const token = jwt.sign(payload, config.SECRET, options)
  console.log(token)
  res.cookie('token', token,
    {
      httpOnly: true,
      maxAge: 86400000
    }
  )
  res.json({message: 'successfully login.'})
})
)
router.get('/logout', ErrorDecorator(async (req, res) => {
  res.clearCookie('token')
  res.json({message: 'successfully logout.'})
}))
router.get('/', ErrorDecorator(async (req, res) => {
  const users = await User.findAll({
    attributes: {exclude: ['password']}
  })
  res.json(users)
}))
module.exports = router
