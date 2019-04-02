//const Migrations = artifacts.require("Migrations");
const IoT = artifacts.require("IoTSecurity");

module.exports = function(deployer) {
  //deployer.deploy(Migrations);
  deployer.deploy(IoT);
};
