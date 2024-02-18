// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./IBlast.sol";

contract CoinFlip {
    IBlast immutable yieldContract =
        IBlast(0x4300000000000000000000000000000000000002);

    // Event showing results of the Flip Game
    event FlipResult(
        address indexed player,
        bool isHeads,
        bool playerWon,
        uint amount
    );

    // Struct to keep track of each player's bet
    struct Bet {
        uint amount;
        bool isHeads;
    }

    // Mapper of address and bets
    mapping(address => Bet) public bets;
    address[] public addresses;

    // Variables for the heads and tails bets
    uint public totalHeadsBets;
    uint public totalTailsBets;

    constructor() {
        // Initialise Blast Eth Yield if it's Blast Chain
        if (block.chainid == 168587773) {
            yieldContract.configureClaimableYield();
        }
    }

    // Function for players to place bets
    function placeBet(bool isHeads) external payable {
        require(msg.value > 0, "Bet amount must be greater than 0");

        bets[msg.sender] = Bet(msg.value, isHeads);
        addresses.push(msg.sender);

        if (isHeads) {
            totalHeadsBets += msg.value;
        } else {
            totalTailsBets += msg.value;
        }
    }

    // Function to execute the coin flip
    function flipCoin() external {
        require(addresses.length > 0, "No bets placed");

        // TODO: Implement Chainlink VRF on Mainnet: https://docs.chain.link/vrf
        // We can't rely on timestap for random result generation
        bool flipResult = (block.timestamp % 2 == 0);

        // Iterate through all players and determine winners
        for (uint i = 0; i < addresses.length; i++) {
            address betAddress = addresses[i];
            Bet memory bet = bets[betAddress];

            bool playerWon = (flipResult == bet.isHeads);

            if (playerWon) {
                uint winAmount = calculateWinAmount(bet.amount, flipResult);
                payable(betAddress).transfer(winAmount);

                // Emit the result for each player
                emit FlipResult(betAddress, bet.isHeads, playerWon, winAmount);
            }
        }

        // Reset the bets for the next game
        resetBets();
    }

    // Function to calculate the win amount
    function calculateWinAmount(
        uint betAmount,
        bool isHeads
    ) public view returns (uint) {
        uint totalBet = isHeads ? totalHeadsBets : totalTailsBets;
        uint totalOppositeBet = isHeads ? totalTailsBets : totalHeadsBets;

        // Ensure there are bets on both sides
        if (totalBet == 0 || totalOppositeBet == 0) {
            return 0;
        }

        // Calculate the win amount
        uint winAmount = betAmount +
            ((betAmount * totalOppositeBet) / totalBet);

        return winAmount;
    }

    // Function to reset bets
    function resetBets() private {
        // Reset logic for the next game
        totalHeadsBets = 0;
        totalTailsBets = 0;

        delete addresses;

        // Iterate through all players and determine winners
        for (uint i = 0; i < addresses.length; i++) {
            address betAddress = addresses[i];
            delete bets[betAddress];
        }
    }

    // Claim Eth Yield
    function claimAllYield(address recipient) external {
        //This function is public meaning anyone can claim the yield
        yieldContract.claimAllYield(address(this), recipient);
    }
}
