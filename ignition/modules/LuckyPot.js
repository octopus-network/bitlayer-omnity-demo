const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

const LuckyPotModule = buildModule("LuckyPotModule", (m) => {
  const tokenAddress = "0xb5d68839bfc052a74e2d840edea8454480719b06";
  const omnityAddress = "0x2afda75bffe47dde22254937ef1e81e1c32b90d9";
  const luckyPot = m.contract("LuckyPot", [tokenAddress, omnityAddress]);

  return { luckyPot };
});

module.exports = LuckyPotModule;
