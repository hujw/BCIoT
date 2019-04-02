module.exports = function (sequelize, DataTypes) {
  const File = sequelize.define('File', {
    fileName: DataTypes.STRING,
    originalName: DataTypes.STRING,
    swarmHash: DataTypes.STRING,
    resource: DataTypes.STRING,
    positives: DataTypes.DECIMAL,
    finished: DataTypes.BOOLEAN,
    url: DataTypes.STRING,
    sha256: DataTypes.STRING
  })
  return File
}
