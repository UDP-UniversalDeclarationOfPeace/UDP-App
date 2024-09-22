// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract MyNFT is ERC721URIStorage {
    uint256 public nextTokenId;
    mapping(address => bool) public hasClaimed;

    constructor() ERC721("PeaceAllie", "UDP") {
        nextTokenId = 1;
    }

    function claimNFT() external {
        require(!hasClaimed[msg.sender], "Ya has reclamado tu NFT");

        uint256 tokenId = nextTokenId;
        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, "https://red-causal-armadillo-397.mypinata.cloud/ipfs/QmctjCE1FyvuHPFYt2PRJWY7mXvNqQWPqMcqFboorLXJBC");

        nextTokenId++;
        hasClaimed[msg.sender] = true;
    }
}
