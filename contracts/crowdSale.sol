// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

import "./MyToken.sol";
import "./KYC.sol";

contract crowdSale is KYC  {

    // The token being sold
    IERC20 private _token;

    // Address where funds are collected
    address payable private _wallet;

    uint256 private _rate;

    uint256 public _weiRaised;

    constructor (uint256 rate, address payable wallet, IERC20 token) KYC() {
        require(rate > 0, "Crowdsale: rate is 0");
        require(wallet != address(0), "Crowdsale: wallet is the zero address");
        require(address(token) != address(0), "Crowdsale: token is the zero address");

        _rate = rate;
        _wallet = wallet;
        _token = token;
    }

    receive()external payable {
        setAllowedTrue(msg.sender);
        uint256 tokenAmount = msg.value * _rate;
        _token.approve(msg.sender,tokenAmount);
        buyTokens(msg.sender);
    }

    function buyTokens(address recepient) public payable {
        require(msg.value != 0);
        require(recepient != address(0));
        require(allowed[recepient] == true);
        uint256 tokenAmount = msg.value * _rate;
        _token.transfer(recepient,tokenAmount);
        transferToOwner();

        // update state
        _weiRaised += msg.value;
    }

    function transferToOwner() private {
        _wallet.transfer(msg.value);
    }

}