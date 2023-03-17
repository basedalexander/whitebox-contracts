import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("WhiteBox", function () {
  async function deployWhiteBox() {
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();

    const WhiteBox = await ethers.getContractFactory("WhiteBox");
    const whiteBox = await WhiteBox.deploy();

    return { whiteBox, owner, otherAccount };
  }

  describe("Deployment", function () {
    it("Should save algo", async function () {
      const { owner, whiteBox } = await loadFixture(deployWhiteBox);

      await whiteBox.saveAlgo("first");
      let authorized = await whiteBox.getAuthorizedAlgos();
      expect(authorized.length).to.equal(0);
      await whiteBox.authorizeAlgo(0);
      authorized = await whiteBox.getAuthorizedAlgos();
      expect(authorized).to.eql(["first"]);

      await whiteBox.saveAndAuthorizeAlgo("second");

      authorized = await whiteBox.getAuthorizedAlgos();
      expect(authorized).to.eql(["first", "second"]);
      await whiteBox.deauthorizeAlgo(0);
      authorized = await whiteBox.getAuthorizedAlgos();
      expect(authorized).to.eql(["second"]);
    });
  });
});
