const config = require('../config/EthConfig')
const Web3 = require('web3')

const {ethereumAddress, swarmAddress} = config

if (!ethereumAddress || !swarmAddress) {
  throw new Error('need config go to change EthConfig.js')
}

// connect to node
let web3 = new Web3(ethereumAddress)
console.log(`connected to ethereum node at ${ethereumAddress}`)
web3.eth.defaultAccount = config.accountAddress
//web3.eth.setProvider(ethereumAddress)
web3.bzz.setProvider(swarmAddress)
module.exports = web3
