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
      url: "",
      accounts: [secret.key]
    },
    maticmain: {
      url: "",
      accounts: [secret.key]
    }
  },
  solidity: "0.8.9",
};
