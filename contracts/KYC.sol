// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

contract KYC {

    mapping(address=>bool)allowed;
    address owner;

    modifier onlyOwner () {
        require(msg.sender == owner , "you not owner");
        _;
    }

    function setAllowedTrue(address _addr)internal onlyOwner{
        allowed[_addr] = true;
    }

    function setAllowedFalse(address _addr)internal onlyOwner{
        allowed[_addr] = false;
    }

    function viewAllowed(address _addr)public view returns(bool){
        return allowed[_addr];
    }

} 