const {SwarmUtils, CompileContract} = require('../eth')
const {EthConfig} = require('../config')
const iot = CompileContract('IoTSecurity', EthConfig.contractAddress)
console.log(iot.instance.methods)
iot.instance.methods.uploadFirmware('test', 'test')
  .send({from: EthConfig.accountAddress})
  .then((res) => console.log('res', res))
console.log(iot)