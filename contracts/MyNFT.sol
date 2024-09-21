// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract MyNFT is ERC721 {
    uint256 public nextTokenId;
    mapping(address => bool) public hasSigned;
    mapping(address => bool) public hasClaimed;

    constructor() ERC721("MyNFT", "MNFT") {
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

        _safeMint(msg.sender, nextTokenId); // Crea el NFT
        nextTokenId++; // Incrementa el ID del token
        hasClaimed[msg.sender] = true; // Marca al usuario como que ya reclamó el NFT
    }

    // Define la base del URI para los metadatos
    function _baseURI() internal view virtual override returns (string memory) {
        return "https://api.mynft.com/metadata/"; // Cambia esto a tu base URI
    }
}
