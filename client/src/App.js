import React, { Component } from "react";
import MyToken from "./contracts/MyToken.json";
import crowdSale from "./contracts/crowdSale.json";
import getWeb3 from "./getWeb3";

import "./App.css";

class App extends Component {
  state = {loaded:false,yourAddress:"0x2413...",tokenSaleAddress:null,userTokens:0};

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      this.web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      this.accounts = await this.web3.eth.getAccounts();

      // Get the contract instance.
      this.networkId = await this.web3.eth.net.getId();
      this.tokenInstance = new this.web3.eth.Contract(
        MyToken.abi,
        MyToken.networks[this.networkId] && MyToken.networks[this.networkId].address,
      );

      this.crowdSaleInstance = new this.web3.eth.Contract(
        crowdSale.abi,
        crowdSale.networks[this.networkId] && crowdSale.networks[this.networkId].address,
      );
      this.listenToTokenTransfer();
      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      //, tokenSaleAddress:crowdSale.networks[this.networkId].address : past this below
      this.setState({ loaded:true , tokenSaleAddress:crowdSale.networks[this.networkId].address ,balance: this.updateUserTokens});
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  updateUserTokens = async () => {
    let userTokens = await this.tokenInstance.methods.balanceOf(this.accounts[0]).call();
    this.setState({userTokens:userTokens});
  }

  listenToTokenTransfer = async() => {
    this.tokenInstance.events.Transfer({to:this.accounts[0]}).on("data",this.updateUserTokens);
  }

  handleBuyTokens = async() => {
    await this.crowdSaleInstance.methods.buyTokens(this.accounts[0]).send({from:this.accounts[0],value: this.web3.utils.toWei("1","wei")});
  }
  
  handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name] : value
    });
  }

  handleRunContract = async () => {
    await this.crowdSaleInstance.methods.setAllowedTrue(this.state.yourAddress).send({from:this.accounts[0]});
    alert("KYC for " + this.state.yourAddress+"is completed");

  }

  render() {
    if (!this.state.loaded) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <h1>BUY ERC20 TOKENS</h1>
        <p>STEP 1: KYC</p>
        <h2>crowdSale</h2>
        complete KYC: <input type = "text" name="yourAddress" value={this.state.yourAddress} onChange = {this.handleInputChange} />
        <button type="button" onClick={this.handleRunContract}>Verify</button>
         <h2>buy tokens</h2>
         <p>if you want buy tokens , send wei to his contract : {this.state.tokenSaleAddress}</p>
         <p>Your currently have : {this.state.userTokens} TOKENS</p>
         <button type ="button" onClick = {this.handleBuyTokens}>Buy more tokens</button>
      </div>
    );
  }
}

export default App;
