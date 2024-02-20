import {
  time,
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox-viem/network-helpers";
import { expect } from "chai";
import hre from "hardhat";
import { getAddress, parseGwei, WalletClient } from "viem";

describe("CoinFlip", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployContract() {
    const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;

    // Contracts are deployed using the first signer/account by default
    const [owner, addr1, addr2, addr3] = await hre.viem.getWalletClients();
    const coinFlip = await hre.viem.deployContract("CoinFlip");

    const publicClient = await hre.viem.getPublicClient();

    // Bets
    const bets = [parseGwei("12"), parseGwei("11"), parseGwei("15")];
    const totalHeadsBets = parseGwei("23");
    const totalTailsBets = parseGwei("15");

    return {
      coinFlip,
      owner,
      addr1,
      addr2,
      addr3,
      bets,
      totalHeadsBets,
      totalTailsBets,
      publicClient,
    };
  }

  describe("Place Bet with 3 different addresses", function () {
    it("Should allow multiple bets from different addresses", async function () {
      const {
        publicClient,
        coinFlip,
        addr1,
        addr2,
        addr3,
        bets,
        totalHeadsBets,
        totalTailsBets,
      } = await loadFixture(deployContract);

      // Place bets with different addresses
      await expect(
        coinFlip.write.placeBet([true], {
          address: addr1.account.address,
          value: bets[0],
        })
      ).to.be.fulfilled;

      await expect(
        coinFlip.write.placeBet([true], {
          address: addr2.account.address,
          value: bets[1],
        })
      ).to.be.fulfilled;

      await expect(
        coinFlip.write.placeBet([false], {
          address: addr3.account.address,
          value: bets[2],
        })
      ).to.be.fulfilled;

      console.log(
        await publicClient.getBalance({
          address: coinFlip.address,
        })
      );

      // Check bet balances
      console.log(await coinFlip.read.totalTailsBets());
      expect(await coinFlip.read.totalHeadsBets()).to.equal(totalHeadsBets);
      expect(await coinFlip.read.totalTailsBets()).to.equal(totalTailsBets);

      // expect(
      //   await publicClient.getBalance({
      //     address: addr1.account.,
      //   })
      // ).to.equal(lockedAmount);
    });
  });

  describe("Flip a coin and transfer funds to winners", function () {
    it("Should transfer funds to the winners", async function () {
      const { coinFlip, addr1, addr2, addr3 } = await loadFixture(
        deployContract
      );

      // Place bets with different addresses
      await expect(coinFlip.write.flipCoin()).to.be.fulfilled;
    });
  });
});
