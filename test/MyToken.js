const MyToken = artifacts.require("./MyToken.sol");

const chai = require("./setupchai.js");
const BN = web3.utils.BN;
const expect = chai.expect;

let owner;
let acc2 , acc3;

contract("ERC20", accounts => {

  const [owner,acc2,acc3] = accounts;

  it("check balances", async () => {
    // const simpleStorageInstance = await SimpleStorage.deployed();

    // Set value of 89
    // await .set(89, { from: accounts[0] });


    let instance = await MyToken.deployed();
    const balanceOff = await instance.balanceOf(owner);
    console.log("balance befora mint",balanceOff);

    let mint = await instance.testMint(owner,46);
    const balanceOfff = await instance.balanceOf(owner);
    console.log("balance after mint",balanceOfff);
  });

  it("should send tokens.", async () => {
    let instance = await MyToken.deployed();
    const totalsupply = await instance.totalSupply();
    console.log("balance after mint",totalsupply);

    let approve = await instance.approve(acc2 , 100);
    expect(approve).to.be.eq(true);
    
  });


});
