const kue = require('kue')
const virustotal = require('./virustotal')
const models = require('../models')
const {SwarmUtils, CompileContract} = require('../eth')
const {EthConfig} = require('../config')
let queue = kue.createQueue({prefix: 'NCHC-IOT'})
process.once('SIGTERM', function (sig) {
  queue.shutdown(5000, function (err) {
    console.log('Kue shutdown: ', err || '')
    process.exit(0)
  })
})
process.once('uncaughtException', function (err) {
  console.error('Something bad happened: ', err)
  queue.shutdown(1000, function (err2) {
    console.error('Kue shutdown result: ', err2 || 'OK')
    process.exit(0)
  })
})
queue.on('error', (err) => {
  console.log('kue err', err)
})

queue.process('fetchReport', 3, async (job, done) => {
  let times = 0
  console.log(job.data)
  const file = await models.File.findById(job.data.fileId)
  console.log('file', file)
  let intervalId
  const fetch = async () => {
    const {fileId} = job.data
    const file = await models.File.findById(fileId)
    const {resource} = file
    console.log("==Fetch VirusTotal==")
    console.log((new Date()).getTime())
    const data = await virustotal.fetchReport(resource)
    if (data.response_code === 1) {
      if (data.positives === 0) {
        await models.File.update({positives: data.positives, finished: true}, {
          where: {
            resource: resource
          }
        })
        await queue.createJob('uploadToSwarm', {fileId}).save()
      } else {
        await models.File.destroy({
          where: {
            resource
          }
        })
      }
      clearInterval(intervalId)
      done()
    }
    console.log((new Date()).getTime())
  }
  intervalId = setInterval(fetch, 30000)
  fetch()
})
queue.process('uploadToSwarm', 3, async (job, done) => {
  const {fileId} = job.data
  const file = await models.File.findById(fileId)
  console.log("==Upload to Swarm==")
  console.log((new Date()).getTime())
  const hash = await SwarmUtils.uploadFile(`${__dirname}/../uploads/${file.fileName}`)
  console.log("[hash]:" + hash)
  console.log((new Date()).getTime())
  await models.File.update({swarmHash: hash}, {where: {id: fileId}})
  await queue.createJob('uploadToEth', {fileId}).save()
  done()
})
queue.process('uploadToEth', async (job, done) => {
  const {fileId} = job.data
  const file = await models.File.findById(fileId)
  const iot = CompileContract('IoTSecurity', EthConfig.contractAddress)
  console.log(file.swarmHash, file.md5)
  const res = await iot.instance.methods.uploadFirmware(file.swarmHash, file.sha256).send({from: EthConfig.accountAddress, gas: 400000})
  console.log(res)
  done()
})
queue.watchStuckJobs(5000)
module.exports = queue
