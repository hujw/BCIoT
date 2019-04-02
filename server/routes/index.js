let express = require('express')
let UserRoute = require('./user')
let FileRoute = require('./file')
let router = express.Router()

router.use('/users', UserRoute)
router.use('/files', FileRoute)

module.exports = router
