require('babel-register');
require('babel-polyfill');
require('dotenv').config();
//const HDWalletProvider = require('truffle-hdwallet-provider-privkey');
const HDWalletProvider = require('@truffle/hdwallet-provider');
const privateKeys = process.env.PRIVATE_KEYS || ""

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*" // Match any network id
    }, 
    sepolia: {
      provider: function() {
        return new HDWalletProvider(
         privateKeys.split(','), // Array of account private keys, 
        `https://sepolia.infura.io/v3/${process.env.INFURA_API_KEY}`
        )
      },
      network_id: "11155111",
      gas: 4465030,
      gasPrice: 25000000000,
      networkCheckTimeout: 1000000,
      timeoutBlocks: 200
    },
    kovan: {
      provider: function() {
        return new HDWalletProvider(
          privateKeys.split(','), // Array of account private keys
          `https://kovan.infura.io/v3/${process.env.INFURA_API_KEY}`// Url to an Ethereum Node
        )
      },
      gas: 5000000,
      gasPrice: 25000000000,
      network_id: 42
    }
  },
  contracts_directory: './src/contracts/',
  contracts_build_directory: './src/abis/',
  compilers: {
    solc: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
}