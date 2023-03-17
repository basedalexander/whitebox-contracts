import { ethers } from "hardhat";

async function main() {
  const WhiteBox = await ethers.getContractFactory("WhiteBox");
  const whiteBox = await WhiteBox.deploy();

  await whiteBox.deployed();

  console.log(`WhiteBox deployed to ${whiteBox.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
