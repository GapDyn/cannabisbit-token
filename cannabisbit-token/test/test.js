const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");

describe("CannabisBit Contract", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshopt in every test.
  async function deployOneYearLockFixture() {
    // Contracts are deployed using the first signer/account by default
    const tName = "CannabisBit";
    const tSymbol = "CBC";
    const [owner, addAccount1, addAccount2, addAccount3] = await ethers.getSigners();
    return { tSymbol, tName, owner, addAccount1, addAccount2, addAccount3 };
  }

  describe("Deployment", function () {

    it('Deploy Contracts', async function () {
      const CannabisBit = await ethers.getContractFactory("CannabisBit");
      cannabisBit = await CannabisBit.deploy();
    });
    it('Token Name', async function () {
      const { tName } = await loadFixture(deployOneYearLockFixture);
      expect(await cannabisBit.name()).to.equal(tName);
    }); 
    it('Token Symbol', async function () {
      const { tSymbol } = await loadFixture(deployOneYearLockFixture);
      expect(await cannabisBit.symbol()).to.equal(tSymbol);
    });
    it('Mint', async function () {
      const { owner, addAccount1, addAccount2, addAccount3 } = await loadFixture(deployOneYearLockFixture);
      const _recipients = [addAccount1.address, addAccount2.address, addAccount3.address];
      expect(await cannabisBit.totalSupply()).to.equal(0);
      const _amount = [2, 3, 4];
      for (let index = 0; index < 3; index++) {
        cannabisBit.connect(owner).mint(_recipients[index], _amount[index]);
      }
      // expect(await cannabisBit.totalSupply()).to.equal(9);
    });
    it('Mint Founder Core team Advisor', async function () {
      const { owner, addAccount1, addAccount2, addAccount3 } = await loadFixture(deployOneYearLockFixture);
      const _recipients = [addAccount1.address, addAccount2.address, addAccount3.address];
      const _amount = [2, 3, 10];
      expect(await cannabisBit.totalSupply()).to.equal(0);
      for (let index = 0; index < 3; index++) {
        cannabisBit.connect(owner).mint(_recipients[index], _amount[index]);
      }
    });

    it('Mint Reserved', async function () {
      const { owner, addAccount1, addAccount2, addAccount3 } = await loadFixture(deployOneYearLockFixture);
      const _recipients = [addAccount1.address, addAccount2.address, addAccount3.address];
      const _amount = [2, 3, 10];
      expect(await cannabisBit.totalSupply()).to.equal(0);
      for (let index = 0; index < 2; index++) {
        cannabisBit.connect(owner).mint(_recipients[index], _amount[index]);
      }
    });
  });
});
