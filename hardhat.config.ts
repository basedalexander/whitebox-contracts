import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import fs from "fs";
import * as dotenv from "dotenv";

// Load env variables
dotenv.config();

const defaultNetwork = "localhost";
const AlchemyKey = process.env.ALCHEMY_KEY;
console.log(AlchemyKey);

function mnemonic() {
  try {
    return fs.readFileSync("./mnemonic.txt").toString().trim();
  } catch (e) {
    if (defaultNetwork !== "localhost") {
      console.log(
        "☢️ WARNING: No mnemonic file created for a deploy account. Try `yarn run generate` and then `yarn run account`."
      );
    }
  }
  return "";
}
const accounts = {
  mnemonic: mnemonic(),
};

const config: HardhatUserConfig = {
  solidity: "0.8.18",
  networks: {
    polygon: {
      chainId: 137,
      url: `https://polygon-mainnet.g.alchemy.com/v2/${AlchemyKey}`,
      accounts,
    },
  },
};

export default config;
