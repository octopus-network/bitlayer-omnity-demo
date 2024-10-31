require("@nomicfoundation/hardhat-toolbox");

// Ensure your configuration variables are set before executing the script
const { vars } = require("hardhat/config");

const BITLAYER_PRIVATE_KEY = vars.get("BITLAYER_PRIVATE_KEY");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.23",
  networks: {
    bitlayer: {
      url: "https://rpc.bitlayer.org" || "",
      accounts: [BITLAYER_PRIVATE_KEY],
    },
  },
};
