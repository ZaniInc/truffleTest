var MyToken = artifacts.require("./MyToken.sol");
var crowdSale = artifacts.require("./crowdSale.sol");

module.exports = async function(deployer) {
  let addr = await web3.eth.getAccounts();
  await deployer.deploy(MyToken,1000000,1000000);
  await deployer.deploy(crowdSale,1,addr[0],MyToken.address);

};
