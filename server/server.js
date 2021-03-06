#!/usr/bin/env node

/**
 * Module dependencies.
 */

let app = require('./app')
let debug = require('debug')('iot')
let http = require('http')
let config = require('dotenv').config().parsed
let models = require('./models')

/**
 * Get port from environment and store in Express.
 */

let port = normalizePort(process.env.PORT || '8000')
app.set('port', port)
console.log(`Listening on port ${port}`)

/**
 * Create HTTP server.
 */

let server = http.createServer(app)

/**
 * Listen on provided port, on all network interfaces.
 */
const {User, Op} = models
models.sequelize.sync()
  .then(() => {
    User.findOrCreate({
      where: {
        username: {
          [Op.eq]: 'admin'
        }
      },
      defaults: {
        username: config.ADMIN_USERNAME,
        password: config.ADMIN_PASSWORD,
        role: 'admin'
      }
    })
  })
  .then(() => {
    /**
     * Listen on provided port, on all network interfaces.
     */
    server.listen(port, function () {
      debug('Express server listening on port ' + server.address().port)
    })
    server.on('error', onError)
    server.on('listening', onListening)
  })

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort (val) {
  let port = parseInt(val, 10)

  if (isNaN(port)) {
    // named pipe
    return val
  }

  if (port >= 0) {
    // port number
    return port
  }

  return false
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError (error) {
  if (error.syscall !== 'listen') {
    throw error
  }

  let bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges')
      process.exit(1)
    case 'EADDRINUSE':
      console.error(bind + ' is already in use')
      process.exit(1)
    default:
      throw error
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening () {
  let addr = server.address()
  let bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port
  debug('Listening on ' + bind)
}
