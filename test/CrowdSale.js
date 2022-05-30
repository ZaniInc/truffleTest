const crowdSale = artifacts.require("./crowdSale");
const MyToken = artifacts.require("./MyToken");

const chai = require("./setupchai.js");
const BN = web3.utils.BN;
const expect = chai.expect;

let owner;
let acc2 , acc3;

contract("CrowdSale", accounts => {

    const [owner,acc2,acc3] = accounts;

    it("check balances must have 0 tokens on owner address", async () => {

        let instance = await MyToken.deployed();
        let balanceOf = await instance.balanceOf(owner);
        expect(balanceOf).to.be.a.bignumber.eq(new BN(0));
    
    });

    it("All tokens on this contract" , async ()=> {
        let instance = await MyToken.deployed();
        let balanceOf = await instance.balanceOf(crowdSale.address);
        let totalsupply = await instance.totalSupply();
        expect(balanceOf).to.be.a.bignumber.eq(totalsupply);
    })

    it("Transfer tokens", async () => {
        let instanceToken = await MyToken.deployed();
        let instanceCrowdSale = await crowdSale.deployed();
        expect(await instanceCrowdSale.sendTransaction({from:owner,value:web3.utils.toWei("1","wei")})).to.be.fulfilled;
        expect(await instanceToken.balanceOf(owner)).to.be.eq(new BN(1));
    });

});