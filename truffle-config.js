const path = require("path");
const HDWalletProvider = require("@truffle/hdwallet-provider");
require("dotenv").config({path: "./.env"});
const AccountIndex = 0;

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    develop: {
      port: 7545,
      host: "127.0.0.1",
      network_id:5777
    },
    ganache_local : {
      provider : function () {
        return new HDWalletProvider(process.env.MNEMONIC,"ganache rpc" , AccountIndex);
      },
      network_id: 5777
    },
    goerli_infura : {
      provider : function () {
        return new HDWalletProvider(process.env.MNEMONIC,"goerli rpc", AccountIndex);
      },
      network_id: 5
    },
    ropsten_infura : {
      provider : function () {
        return new HDWalletProvider(process.env.MNEMONIC,"ropsten rpc",AccountIndex);
      },
      network_id: 3
    }
  },
  compilers : {
    solc : {
      version :"0.8.7"
  }
  }
};
