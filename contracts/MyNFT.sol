// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract MyNFT is ERC721URIStorage {
    uint256 public nextTokenId;
    mapping(address => bool) public hasSigned;
    mapping(address => bool) public hasClaimed;

    constructor() ERC721("PeaceAllie", "UDP") {
        nextTokenId = 1; // Inicializa el ID del siguiente token
    }

    // Función para que un usuario firme la declaración
    function signDeclaration() external {
        require(!hasSigned[msg.sender], "Ya has firmado la declaracion");
        hasSigned[msg.sender] = true; // Marca al usuario como firmado
    }

    // Función para reclamar el NFT después de firmar
    function claimNFT() external {
        require(hasSigned[msg.sender], "Primero debes firmar la declaracion");
        require(!hasClaimed[msg.sender], "Ya has reclamado tu NFT");

        uint256 tokenId = nextTokenId; // Asignar el ID del token
        _safeMint(msg.sender, tokenId); // Crea el NFT
        _setTokenURI(tokenId, "https://red-causal-armadillo-397.mypinata.cloud/ipfs/QmctjCE1FyvuHPFYt2PRJWY7mXvNqQWPqMcqFboorLXJBC"); // Asigna el URI
        nextTokenId++; // Incrementa el ID del token
        hasClaimed[msg.sender] = true; // Marca al usuario como que ya reclamó el NFT
    }

    // No necesitamos override de tokenURI ya que lo maneja ERC721URIStorage
}
