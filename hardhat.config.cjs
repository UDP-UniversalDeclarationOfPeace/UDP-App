require("dotenv").config({ path: '.env.local' }); // Cargar variables de entorno desde .env.local
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-waffle");
require("@openzeppelin/hardhat-upgrades");

module.exports = {
    solidity: {
        version: "0.8.20",
        settings: {
            optimizer: {
                enabled: true,
                runs: 200,
            },
        },
    },
    networks: {
        optimismSepolia: {
            url: "https://sepolia.optimism.io",
            accounts: [process.env.PRIVATE_KEY], // Asegúrate de que tu clave privada esté correctamente configurada
        },
    },
};
