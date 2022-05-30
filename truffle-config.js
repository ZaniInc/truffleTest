const path = require("path");

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    develop: {
      port: 8545
    }
  },
  compilers : {
    solc : {
      version :"0.8.7"
  }
  },
  ropsten_network : {
    provider : function () {
      return new HDWalletProvider("https://ropsten.infura.io/v3/23b0f66c3c2b4d77ad961d2f97c04e44");
    },
    network_id: 3
  }
};
