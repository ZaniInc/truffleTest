// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MyToken is ERC20 {

  uint initialSupply;
  uint maxSupply;

  constructor (uint _initialSupply , uint _maxSupply) ERC20("MYTOKEN" , "MM") {
    _mint(msg.sender,_initialSupply);
    maxSupply = _maxSupply;
  }

  function testMint (address owner , uint amount) public {
    require(maxSupply <= 1000000 , "MAX SUPPLY ERROR");
    _mint(owner,amount);
  }

}
