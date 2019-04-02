const web3 = require('./ConfiguredWeb3')
const fs = require('fs')

const {bzz} = web3
console.log(bzz.currentProvider)
const uploadRaw = async (content) => {
  const hash = await bzz.upload(content)
  return hash
}
const uploadFile = async (filePath) => {
//  const hash = await bzz.upload({
//    path: filePath,
//    kind: 'file'
//  })
//  return hash

    const content = await fs.readFileSync(filePath)
    const hash = await bzz.upload(content)
    return hash
}
const download = async (bzzHash, path) => {
  try {
    const Path = await bzz.download(bzzHash, path)
    return Path
  } catch (err) {
    console.error(err)
  }
}

module.exports = {
  uploadRaw,
  uploadFile,
  download
}
