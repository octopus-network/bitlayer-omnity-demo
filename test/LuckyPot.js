// This is an example test file. Hardhat will run every *.js file in `test/`,
// so feel free to add new ones.

// Hardhat tests are normally written with Mocha and Chai.

// We import Chai to use its asserting functions here.
const { expect } = require("chai");

// We use `loadFixture` to share common setups (or fixtures) between tests.
// Using this simplifies your tests and makes them run faster, by taking
// advantage or Hardhat Network's snapshot functionality.
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
// const { ethers } = require("hardhat");

// `describe` is a Mocha function that allows you to organize your tests.
// Having your tests organized makes debugging them easier. All Mocha
// functions are available in the global scope.
//
// `describe` receives the name of a section of your test suite, and a
// callback. The callback must define the tests of that section. This callback
// can't be an async function.
describe("LuckyPot", function () {
  // Fixture that deploys all contracts for testing
  async function deployFixture() {
    // Deploy mock contracts
    const token = await ethers.deployContract("MockToken");

    const omnityPort = await ethers.deployContract("MockOmnityPort")

    // Deploy main contract
    const luckyPot = await ethers.deployContract("LuckyPot", [token.target, omnityPort.target]);

    // Get signers
    const [owner, user] = await ethers.getSigners();

    return { 
      luckyPot,
      token,
      omnityPort,
      owner,
      user
    };
  }

  // You can nest describe calls to create subsections.
  describe("Deployment", function () {
    it("Should set the right balance", async function () {
      const { luckyPot } = await loadFixture(deployFixture);
      expect(await luckyPot.balance()).to.equal(42);
    });
  });

  describe("Transactions", function () {
    it("Should emit deposit event", async function () {
      const { luckyPot, user } = await loadFixture(deployFixture);
      const paymentAmount = ethers.parseEther("0.005");
      
      await expect(luckyPot.connect(user).deposit({ value: paymentAmount }))
        .to.emit(luckyPot, "PotDeposit")
        .withArgs(user.address);
    });
  });
});
