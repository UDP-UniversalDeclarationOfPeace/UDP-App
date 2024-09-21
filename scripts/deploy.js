// scripts/deploy.js

async function main() {
    // Obtener el contrato Guestbook y desplegarlo
    const Guestbook = await ethers.getContractFactory("Guestbook");
    console.log("Desplegando Guestbook...");
    const guestbook = await Guestbook.deploy();
    await guestbook.deployed();
    console.log("Guestbook desplegado en:", guestbook.address);
  
    // Obtener el contrato MyNFT y desplegarlo
    const MyNFT = await ethers.getContractFactory("MyNFT");
    console.log("Desplegando MyNFT...");
    const myNFT = await MyNFT.deploy();
    await myNFT.deployed();
    console.log("MyNFT desplegado en:", myNFT.address);
  }
  
  // Ejecutar el script
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
  