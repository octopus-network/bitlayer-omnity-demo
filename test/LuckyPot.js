// This is an example test file. Hardhat will run every *.js file in `test/`,
// so feel free to add new ones.

// Hardhat tests are normally written with Mocha and Chai.

// We import Chai to use its asserting functions here.
const { expect } = require("chai");

// We use `loadFixture` to share common setups (or fixtures) between tests.
// Using this simplifies your tests and makes them run faster, by taking
// advantage or Hardhat Network's snapshot functionality.
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");

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
    // Get contract factories
    const Token = await ethers.getContractFactory("MockToken");
    const OmnityPort = await ethers.getContractFactory("MockOmnityPort");
    const LuckyPot = await ethers.getContractFactory("LuckyPot");

    // Deploy mock contracts
    const token = await Token.deploy();
    await token.deployed();

    const omnityPort = await OmnityPort.deploy();
    await omnityPort.deployed();

    // Deploy main contract
    const luckyPot = await LuckyPot.deploy(token.address, omnityPort.address);
    await luckyPot.deployed();

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
      
      await expect(luckyPot.connect(user).deposit())
        .to.emit(luckyPot, "PotDeposit")
        .withArgs(user.address);
    });
  });
});
