
// SPDX-License-Identifier: GPL-3.0-only

pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Context.sol";

interface Token {
    function transfer(address recipient, uint256 amount) external returns (bool);
    function balanceOf(address account) external view returns (uint256);
    function transferFrom(address sender, address recipient, uint256 amount) external returns (uint256);    
}

contract StakeHarmony is Pausable, Ownable, ReentrancyGuard {

    Token ONE;

    // 1 year Days (365 * 24 * 60 * 60)
    // uint256 public planDuration = 31536000;

    //For testing purposes
    //1 minute
    uint256 public planDuration = 60;

    // 180 Days (180 * 24 * 60 * 60)
    // uint256 _planExpired = 15552000;

    uint8 public interestRate = 10;
    // uint256 public planExpired = 15552000;
    uint8 public totalStakers;

    struct StakeInfo {        
        uint256 startTS;
        uint256 endTS;        
        uint256 stakedAmount; 
        uint256 claimed;       
    }
    
    event Staked(address indexed from, uint256 amount);
    event Claimed(address indexed from, uint256 amount);
    
    mapping(address => StakeInfo) public stakeInfos;
    
    // mapping(address => bool) public addressStaked;

    modifier hasNotStaked {
        require(stakeInfos[_msgSender()].startTS == 0, "You already participated");
        _;
    }  
    
    modifier hasStaked {
        require(stakeInfos[_msgSender()].startTS != 0, "You need to have staked");
        _;
    }  

    constructor(Token _tokenAddress) {
        require(address(_tokenAddress) != address(0),"Token Address cannot be address 0");                
        ONE = _tokenAddress;        
        // planExpired = block.timestamp + planExpired;
        totalStakers = 0;
    }   
    
    //Funtion for one to stake a certain amount 
    function stakeToken(uint256 stakeAmount) external payable hasNotStaked whenNotPaused {
        //Checks if on eis staking a value less than or equal to 0
        require(stakeAmount > 0, "Stake amount should be correct");
        
        // require(block.timestamp < planExpired , "Plan Expired");

        // require(addressStaked[_msgSender()] == false, "You already participated");

        //One has enough amount to stake
        require(ONE.balanceOf(_msgSender()) >= stakeAmount, "Insufficient Balance");
        
           ONE.transferFrom(_msgSender(), address(this), stakeAmount);
            totalStakers++;
            // addressStaked[_msgSender()] = true;

            stakeInfos[_msgSender()] = StakeInfo({                
                startTS: block.timestamp,
                endTS: block.timestamp + planDuration,
                stakedAmount: stakeAmount,
                claimed: 0
            });
        
        emit Staked(_msgSender(), stakeAmount);
    }  
    
    //Function to claim reward after stake period is over for one who ONLY staked
    function claimReward()  external  hasStaked returns (bool){
        // require(addressStaked[_msgSender()] == true, "You are not participated");
        require(stakeInfos[_msgSender()].endTS < block.timestamp, "Stake Time is not over yet");
        require(stakeInfos[_msgSender()].claimed == 0, "Already claimed");

        uint256 stakeAmount = stakeInfos[_msgSender()].stakedAmount;
        uint256 totalTokens = stakeAmount + (stakeAmount * interestRate / 100);
        stakeInfos[_msgSender()].claimed == totalTokens;
        ONE.transfer(_msgSender(), totalTokens);

        emit Claimed(_msgSender(), totalTokens);

        return true;
    }

    //Function to transfer token once interest is gained
    function transferToken(address to,uint256 amount) hasStaked external onlyOwner{
        require(ONE.transfer(to, amount), "Token transfer failed!");  
    }


    function getTokenExpiry() hasStaked external view returns (uint256) {
        // require(addressStaked[_msgSender()] == true, "You are not participated");
        return stakeInfos[_msgSender()].endTS;
    }
 
    function pause() external onlyOwner {
        _pause();
    }

    function unpause() external onlyOwner {
        _unpause();
    }

    //Delegate Call - structure has to be same
}