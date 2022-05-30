const MyToken = artifacts.require("./MyToken");

const chai = require("./setupchai.js");
const BN = web3.utils.BN;
const expect = chai.expect;

let owner;
let acc2 , acc3;

contract("ERC20", accounts => {

  const [owner,acc2,acc3] = accounts;

  it("check balances must have 0 tokens", async () => {

    let instance = await MyToken.deployed();
    let balanceOff = await instance.balanceOf(owner);
    let totalsupply = await instance.totalSupply();
    expect(balanceOff).to.be.a.bignumber.eq(new BN(0));

  });

  it("should send tokens between 2 accounts", async () => {
    const amountTokens = 1;
    let instance = await MyToken.deployed();
    const totalsupply = await instance.totalSupply();
    expect(instance.transfer(acc2,amountTokens)).to.eventually.be.fulfilled;
    expect(instance.balanceOf(owner)).to.eventually.be.a.bignumber.equal(totalsupply.sub(new BN(amountTokens)));
    expect(instance.balanceOf(acc2)).to.eventually.be.a.bignumber.equal(new BN(amountTokens));

  });


});
