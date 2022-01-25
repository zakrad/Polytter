/**
 * @type import('hardhat/config').HardhatUserConfig
 */
require("@nomiclabs/hardhat-ethers");
require('hardhat-deploy');
const fs = require('fs');
let secret = require('./secret');
module.exports = {
  defaultNetwork: "matic",
  networks: {
    hardhat: {
    },
    matic: {
      url: "https://speedy-nodes-nyc.moralis.io/453da2a22cc39051bdeaaeb2/polygon/mumbai",
      accounts: [secret.key]
    },
    maticmain: {
      url: "https://speedy-nodes-nyc.moralis.io/453da2a22cc39051bdeaaeb2/polygon/mainnet",
      accounts: [secret.key]
    }
  },
  solidity: "0.8.9",
};
