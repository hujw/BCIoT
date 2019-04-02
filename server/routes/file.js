const models = require('../models')
const express = require('express')
const CustomError = require('../utils/CustomError')
const ErrorDecorator = require('../utils/ErrorDecorator')
const router = express.Router()
const utils = require('../utils')
const fs = require('fs')
const {File} = models
const {User, Op} = models
router.post('/upload',
  ErrorDecorator(async (req, res) => {
    const {originalname, filename} = req.file
    const data = await utils.virustotal.scan(filename)
    const {scan_id, sha1, resource, sha256, md5, permalink} = data
    const r = await File.create({
      originalName: originalname,
      fileName: filename,
      resource: resource,
      url: permalink,
      sha256
    })
    console.log('id', r.id)
    await utils.queue.createJob('fetchReport', {fileId: r.id}).save()
    res.json(data)
  })
)
router.get('/', ErrorDecorator(async (req, res) => {
  const files = await File.findAll()
  res.json({files})
}))
router.get('/:id',
  ErrorDecorator(async (req, res) => {
    const {id} = req.params
    const file = await File.findById(id)
    if (!file) {
      throw new CustomError('not found!', 404)
    }
    res.download(`${__dirname}/../uploads/${file.fileName}`, file.originalName)
  })
)
router.delete('/:id',
  ErrorDecorator(async (req, res) => {
    const {id} = req.params
    const file = await File.findById(id)
    if (!file) {
      throw new CustomError('not found!', 404)
    }
    await File.destroy({
      where: {
        id: file.id
      }
    })
    fs.unlinkSync(`${__dirname}/../uploads/${file.fileName}`)
    res.json({message: 'successfully delete.'})
  })
)
module.exports = router
