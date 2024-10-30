require("@nomicfoundation/hardhat-toolbox");

// Ensure your configuration variables are set before executing the script
const { vars } = require("hardhat/config");

const BITLAYER_PRIVATE_KEY = vars.get("BITLAYER_PRIVATE_KEY");

// The next line is part of the sample project, you don't need it in your
// project. It imports a Hardhat task definition, that can be used for
// testing the frontend.
require("./tasks/faucet");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.23",
  networks: {
    bitlayer: {
      url: "https://testnet-rpc.bitlayer.org" || "",
      accounts: [BITLAYER_PRIVATE_KEY],
    },
  },
};
