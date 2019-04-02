const _ = require('lodash')
const fs = require('fs')
const solc = require('solc')
const web3 = require('./ConfiguredWeb3')

function findImports (path) {
  const source = fs.readFileSync(`${__dirname}/../contracts/${path}`, 'utf8')
  return {contents: source}
}

const compileContract = (name, address) => {
  let source = fs.readFileSync(`${__dirname}/../contracts/` + name + '.sol', 'utf8')
  console.log(`compile ${name}.sol`)
  let compiledContract = solc.compile({sources: {source}}, 0, findImports)
  const byteCode = _.get(compiledContract, ['contracts', `source:${name}`, 'bytecode'])
  const abi = JSON.parse(_.get(compiledContract, ['contracts', `source:${name}`, 'interface']))

  const instance = new web3.eth.Contract(abi, address)

  return {
    byteCode,
    abi,
    instance
  }
}

module.exports = compileContract
