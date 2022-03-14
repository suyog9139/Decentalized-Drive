let GDStorage = artifacts.require("GDStorage");

module.exports = function(deployer) {
	//Deploy Contract
	deployer.deploy(GDStorage);
};
