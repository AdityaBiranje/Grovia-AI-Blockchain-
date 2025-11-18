// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20; // match with OZ version

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract CarbonToken is ERC20, Ownable {
    mapping(uint256 => string) public metadataHash;
    uint256 public nextProjectId = 1;

    event ProjectMinted(uint256 indexed projectId, address indexed issuer, uint256 amount, string metadata);

    constructor(string memory name_, string memory symbol_) 
        ERC20(name_, symbol_) 
        Ownable(msg.sender) // ✅ new addition for OZ v5
    {}

    function mintForProject(address to, uint256 amount, string calldata ipfsHash)
        external
        onlyOwner
        returns (uint256)
    {
        uint256 projectId = nextProjectId++;
        _mint(to, amount);
        metadataHash[projectId] = ipfsHash;
        emit ProjectMinted(projectId, to, amount, ipfsHash);
        return projectId;
    }

    function retire(uint256 amount) external {
        _burn(msg.sender, amount);
    }
}
