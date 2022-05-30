var MyToken = artifacts.require("./MyToken.sol");
var crowdSale = artifacts.require("./crowdSale.sol");
require("dotenv").config({path : "../.env"});

module.exports = async function(deployer) {
  let addr = await web3.eth.getAccounts();
  await deployer.deploy(MyToken,process.env.INITIAL_TOKENS);
  await deployer.deploy(crowdSale,1,addr[0],MyToken.address);
  let instance = await MyToken.deployed();
  await instance.transfer(crowdSale.address,process.env.INITIAL_TOKENS);

};
