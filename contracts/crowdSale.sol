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

    constructor (uint256 rate, address payable wallet, IERC20 token) {
        require(rate > 0, "Crowdsale: rate is 0");
        require(wallet != address(0), "Crowdsale: wallet is the zero address");
        require(address(token) != address(0), "Crowdsale: token is the zero address");

        _rate = rate;
        _wallet = wallet;
        _token = token;
        owner = msg.sender;
    }

    receive()external payable {
        setAllowedTrue(msg.sender);
        buyTokens(msg.sender);
    }

    function buyTokens(address recepient) public payable {
        require(msg.value != 0);
        require(recepient != address(0));
        require(allowed[recepient] == true);
        uint256 weiAmount = msg.value;
        uint256 tokenAmount = weiAmount * _rate;
        _token.transferFrom(address(this),recepient,tokenAmount);
        transferToOwner();

        // update state
        _weiRaised += weiAmount;
    }

    function transferToOwner() private {
        _wallet.transfer(msg.value);
    }

}