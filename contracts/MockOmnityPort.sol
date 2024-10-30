// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.23;

import "hardhat/console.sol";

import "./LuckyPot.sol";

contract MockOmnityPort is OmnityPort {
    // Mock fee amount
    uint128 constant public BITCOIN_FEE = 0.005 ether;
    uint128 constant public BEVM_FEE = 0.001 ether;

    function mintRunes(
        string memory tokenId,
        address receiver
    ) external payable override {
        console.log(
            "Mock: Minting %s to %s",
            tokenId,
            receiver
        );
    }
    
    function redeemToken(
        string memory tokenId,
        string memory receiver,
        uint256 amount
    ) external payable override {
        console.log(
            "Mock: Redeeming %d %s to %s on Bitcoin",
            amount,
            tokenId,
            receiver
        );
    }
    
    function transportToken(
        string memory,
        string memory tokenId,
        string memory receiver,
        uint256 amount,
        string memory 
    ) external payable override {
        console.log(
            "Mock: Transporting %d %s to %s on BEVM",
            amount,
            tokenId,
            receiver
        );
    }
    
    function burnToken(
        string memory tokenId,
        uint256 amount
    ) external payable override {
        console.log(
            "Mock: Burning %d %s",
            amount,
            tokenId
        );
    }
    
    function calculateFee(
        string memory target_chain_id
    ) external pure override returns (uint128) {
        bytes32 chainHash = keccak256(abi.encodePacked(target_chain_id));
        
        if (chainHash == keccak256(abi.encodePacked("Bitcoin"))) {
            return BITCOIN_FEE;
        } else if (chainHash == keccak256(abi.encodePacked("bevm"))) {
            return BEVM_FEE;
        }
        
        revert("Unsupported chain");
    }
}