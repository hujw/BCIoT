const express = require('express')
const kue = require('kue')
const fs = require('fs')
const path = require('path')
const logger = require('morgan')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const multer = require('multer')
const Router = require('./routes')
const app = express()
const checkAuth = require('./utils/checkAuth')
const CustomError = require('./utils/CustomError')
require('./utils/queue')

app.use((req, res, next) => {
  req.checkAuth = checkAuth
  next()
}
)
if (process.env.NODE_ENV === 'dev') {
  app.use(logger('dev'))
}
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cookieParser())
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '/uploads'))
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now())
  }
})
app.use(multer({storage}).single('file'))
app.use('/api/queue', kue.app)
app.use('/api', Router)
app.use((err, req, res, next) => {
  if (err) {
    if (err instanceof CustomError) {
      res.status(err.status)
    } else {
      res.status(400)
    }
    res.json({error: err.message})
  } else res.status(404).json({error: 'not found'})
})
module.exports = app
