// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

contract KYC {

    mapping(address=>bool)allowed;

    function setAllowedTrue(address _addr)internal {
        allowed[_addr] = true;
    }

    function setAllowedFalse(address _addr)internal {
        allowed[_addr] = false;
    }

    function viewAllowed(address _addr)public view returns(bool){
        return allowed[_addr];
    }

} 