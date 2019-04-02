const Axios = require('axios')
const rp = require('request-promise')
const fs = require('fs')
const path = require('path')
const config = require('dotenv').config().parsed
const {API_KEY} = config
const API_HOST = 'https://www.virustotal.com/vtapi/v2'
const scan = async (fileName) => {
  const options = {
    method: 'POST',
    uri: `${API_HOST}/file/scan`,
    qs: {
      apikey: API_KEY
    },
    formData: {
      file: fs.createReadStream(`${__dirname}/../uploads/${fileName}`)
    }
  }
  const data = await rp(options)
  return JSON.parse(data)
}

const fetchReport = async (resource) => {
  const options = {
    method: 'GET',
    uri: `${API_HOST}/file/report`,
    qs: {
      apikey: API_KEY,
      resource: resource
    }
  }
  const data = await rp(options)
  return JSON.parse(data || {})
}

module.exports = {
  scan,
  fetchReport
}
