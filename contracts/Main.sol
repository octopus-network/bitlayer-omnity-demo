// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

contract OmnityDappDemo {
    OmnityPort omnityPort; 
  

    constructor(address port) payable {
        omnityPort = OmnityPort(port);
    }


    function redeemToken(
        string memory tokenId,
        string memory receiver,
        uint256 amount
    ) external payable {
        omnityPort.redeemToken{value:msg.value}(tokenId, receiver, amount);
    }

    function transportToken(
        string memory dstChainId,
        string memory tokenId,
        string memory receiver,
        uint256 amount,
        string memory memo
    ) external payable {
        omnityPort.transportToken{value: msg.value}(dstChainId, tokenId, receiver, amount, memo);
    }

    function burnToken(string memory tokenId, uint256 amount) external payable{
        omnityPort.burnToken{value: msg.value}(tokenId, amount);
    }

    function calcFee(string memory target_chain_id) public view returns (uint128){
        return omnityPort.calculateFee(target_chain_id);
    }


}

interface OmnityPort {

    function redeemToken(
        string memory tokenId,
        string memory receiver,
        uint256 amount
    ) external payable;

    function transportToken(
        string memory dstChainId,
        string memory tokenId,
        string memory receiver,
        uint256 amount,
        string memory memo
    ) external payable;

    function burnToken(string memory tokenId, uint256 amount) external payable;

    function calculateFee(
        string memory target_chain_id
    ) external view returns (uint128);
}