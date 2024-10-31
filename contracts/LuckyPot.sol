//SPDX-License-Identifier: UNLICENSED

// Solidity files have to start with this pragma.
// It will be used by the Solidity compiler to validate its version.
pragma solidity ^0.8.23;

// We import this library to be able to use console.log
import "hardhat/console.sol";

// Add this import at the top of the file
import "@openzeppelin/contracts/utils/Strings.sol";

interface IERC20 {
    function balanceOf(address account) external view returns (uint256);
}

interface OmnityPort {
    function mintRunes(
        string memory tokenId,
        address receiver
    ) external payable;
    
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
    
    function burnToken(
        string memory tokenId, 
        uint256 amount
    ) external payable;
    
    function calculateFee(
        string memory target_chain_id
    ) external view returns (uint128);
}

// This is the main building block for smart contracts.
contract LuckyPot {
    // State variables
    address public pot;
    IERC20 public token;
    OmnityPort public omnity;

    // Constants
    string public tokenId = unicode"Bitcoin-runes-UNCOMMON•GOODS";
    string public settlementChainId = "Bitcoin";
    string public dstChainId = "bevm";

    // Events
    event PotDeposit(address indexed _from);
    event PotDraw(address indexed _drawer, string _receiver, string _chain);
    event PotBurn(address indexed _drawer);

    /**
     * Contract initialization.
     */
    constructor(address _tokenAddress, address _omnityAddress) {
        token = IERC20(_tokenAddress);
        omnity = OmnityPort(_omnityAddress);

        pot = address(this);
    }

    function balance() external view returns (uint256) {
        return token.balanceOf(pot);
    }
    
    function deposit() external payable {
        uint128 redeemFee = omnity.calculateFee(settlementChainId);

        omnity.mintRunes{value: redeemFee}(tokenId, pot);

        console.log(
            unicode"1 UNCOMMON•GOODS will be added to the pot by %s",
            msg.sender
        );

        emit PotDeposit(msg.sender);
    }
    
    function draw(string memory receiver) external payable {
        require(this.balance() >= 1, "Insufficient pot balance");

        uint128 transportFee = omnity.calculateFee(dstChainId);
        uint128 redeemFee = omnity.calculateFee(settlementChainId);

        require(msg.value >= transportFee && msg.value >= redeemFee, "Insufficient fee");

        uint256 rand = uint256(keccak256(abi.encodePacked(block.timestamp, block.prevrandao))) % 3;

        if (rand == 0) {
            omnity.redeemToken{value: redeemFee}(tokenId, receiver, 1);
            console.log(unicode"drew 1 UNCOMMON•GOODS to %s on %s", receiver, settlementChainId);
            emit PotDraw(msg.sender, receiver, settlementChainId);
        } else if (rand == 1) {
            omnity.transportToken{value: transportFee}(
                dstChainId, 
                tokenId, 
                Strings.toHexString(uint160(msg.sender), 20),
                1, 
                "LuckyPot"
            );
            console.log(
                unicode"drew 1 UNCOMMON•GOODS to %s on %s", 
                Strings.toHexString(uint160(msg.sender), 20),
                dstChainId
            );
            emit PotDraw(msg.sender, Strings.toHexString(uint160(msg.sender), 20), dstChainId);
        } else {
            omnity.burnToken{value: redeemFee}(tokenId, 1);
            console.log(unicode"destroyed 1 UNCOMMON•GOODS into void by %s", msg.sender);
            emit PotBurn(msg.sender);
        }
    }
}