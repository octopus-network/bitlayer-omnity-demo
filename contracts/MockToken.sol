// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.23;

import "./LuckyPot.sol";

contract MockToken is IERC20 {
    constructor() {}
    
    // Implement the required balanceOf function
    function balanceOf(address) external pure override returns (uint256) {
        return 42;
    }
}