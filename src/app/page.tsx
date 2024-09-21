"use client";

import { useState, useEffect } from "react";
import { ConnectButton, darkTheme } from "thirdweb/react";
import { client } from "./client";
import { inAppWallet, createWallet } from "thirdweb/wallets";
import { optimismSepolia } from "thirdweb/chains"; // Red de Optimism Sepolia
import { ethers } from "ethers";
import GuestbookABI from "../abis/Guestbook.json";
import MyNFTABI from "../abis/MyNFT.json";
import Image from "next/image";
import "./globals.css";

const wallets = [
  inAppWallet({
    auth: {
      options: [
        "google",
        "telegram",
        "farcaster",
        "email",
        "x",
        "passkey",
        "phone",
      ],
    },
  }),
  createWallet("io.metamask"),
  createWallet("com.coinbase.wallet"),
];

const guestbookAddress = "0xb8C740c7F2eEF95390d2Db5cf7d650fB8FC7Eb4F";
const myNFTAddress = "0xb45663b6745Ed924957d6faFA91f987064771F3e";

export default function Home() {
  const [signatories, setSignatories] = useState([]); // Lista de signatarios
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    country: "",
    message: "",
  });
  const [isConnected, setIsConnected] = useState(false);
  const [loading, setLoading] = useState(false); // Indicador de carga
  const [submitSuccess, setSubmitSuccess] = useState(false); // Indicador de éxito

  useEffect(() => {
    const fetchSignatories = async () => {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const guestbookContract = new ethers.Contract(guestbookAddress, GuestbookABI.abi, provider);

      try {
        // Supongamos que tienes una función en tu contrato que retorna las firmas
        const signatures = await guestbookContract.getSignatures(); 
        // Esto debería devolver un array de objetos con la estructura [name, email, country, message]
        const formattedSignatures = signatures.map((sig, index) => ({
          id: index,
          name: sig[0],
          email: sig[1],
          country: sig[2],
          message: sig[3],
        }));
        setSignatories(formattedSignatures);
      } catch (error) {
        console.error("Error al obtener las firmas:", error);
      }
    };

    if (isConnected) {
      fetchSignatories();
    }
  }, [isConnected]);

  const handleConnect = async () => {
    setIsConnected(true); // Marca como conectado
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true); // Muestra el indicador de carga
    setSubmitSuccess(false); // Reinicia el indicador de éxito
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      
      const guestbookContract = new ethers.Contract(guestbookAddress, GuestbookABI.abi, signer);
      const myNFTContract = new ethers.Contract(myNFTAddress, MyNFTABI.abi, signer);

      // Lógica para guardar la firma en el contrato
      const tx = await guestbookContract.signDeclaration(formData.name, formData.email, formData.country, formData.message);
      await tx.wait();

      // Reclama el NFT después de firmar
      const nftTx = await myNFTContract.mintNFT(signer.getAddress());
      await nftTx.wait();

      // Añadir el nuevo firmante a la lista localmente (opcional, para el estado de la UI)
      setSignatories([...signatories, { ...formData, id: Date.now() }]); // Agregar ID único
      setFormData({ name: "", email: "", country: "", message: "" }); // Limpiar el formulario
      setSubmitSuccess(true); // Marca el submit como exitoso
    } catch (error) {
      console.error("Error al firmar la transacción:", error);
    } finally {
      setLoading(false); // Desactiva el indicador de carga
    }
  };

  return (
    <main className="p-4 pb-10 min-h-[100vh] flex items-center justify-center container max-w-screen-lg mx-auto gradient-background">
      <div className="py-10 w-full">
        {/* Logo en la parte superior */}
        <div className="text-center mb-6">
          <Image
            src="https://i.postimg.cc/261BRVLF/UDPLOGO.png"
            alt="Logo"
            width={150}
            height={150}
          />
        </div>

         {/* Declaración Universal de Paz */}
         <div className="bg-box-color text-elegant-white p-6 rounded-lg shadow-lg max-w-full mx-auto mb-10">
          <h2 className="text-3xl font-bold mb-6 text-center">Universal Declaration Of Peace</h2>
          <p className="mb-4 text-xl font-semibold">A Global Commitment to Peace, Justice, and Sustainable Development</p>
          <p className="mb-4">
            In recognition of our shared humanity and the need for a harmonious coexistence, we, the peoples of the world, represented by our governments, organizations, and individuals, hereby declare our collective commitment to peace, justice, and sustainable development. This declaration aims to promote global cooperation, mutual respect, and understanding, transcending borders and cultural differences.
          </p>

          {/* Reproductor de video de YouTube */}
          <div className="mb-10">
            <iframe
              width="760"
              height="515"
              src="https://www.youtube.com/embed/mqfYyg8ZMwk?si=WJ52Y_fHhk8wyR18"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </div>

          {/* Artículos */}
          <h3 className="font-semibold">Article 1: Commitment to Peace</h3>
          <p>Peaceful Resolution of Conflicts: All signatories commit to resolving disputes through dialogue, negotiation, and other peaceful means, refraining from the use of force and violence.</p>
          <p>Disarmament: We pledge to work towards the reduction and eventual elimination of nuclear, chemical, and biological weapons, as well as conventional arms, in a manner that promotes global security.</p>
          <p>Non-Aggression: We commit to respecting the sovereignty, territorial integrity, and political independence of all nations, refraining from acts of aggression and occupation.</p>
          <h3 className="font-semibold">Article 2: Promotion of Human Rights</h3>
          <p>Universal Human Rights: All signatories affirm their commitment to upholding the Universal Declaration of Human Rights, ensuring the protection and promotion of civil, political, economic, social, and cultural rights for all individuals.</p>
          <p>Equality and Non-Discrimination: We pledge to eliminate all forms of discrimination and promote equality, ensuring that everyone has access to the same opportunities and resources, regardless of race, gender, religion, ethnicity, or any other status.</p>
          <p>Protection of Vulnerable Groups: We commit to protecting the rights of vulnerable groups, including children, women, indigenous peoples, refugees, and persons with disabilities, ensuring their inclusion and participation in all aspects of society.</p>
          <h3 className="font-semibold">Article 3: Sustainable Development</h3>
          <p>Environmental Stewardship: All signatories commit to protecting and preserving our planet for future generations, taking urgent action to combat climate change, protect biodiversity, and promote sustainable use of natural resources.</p>
          <p>Economic Development: We pledge to promote inclusive and sustainable economic growth, reducing poverty and inequality, and ensuring that all people can achieve their full potential in a healthy environment.</p>
          <p>Education and Innovation: We commit to ensuring access to quality education for all, fostering innovation, and supporting scientific research that advances human knowledge and well-being.</p>
          <h3 className="font-semibold">Article 4: Global Cooperation</h3>
          <p>Multilateralism: All signatories reaffirm their commitment to the principles and purposes of the United Nations, supporting multilateralism and international cooperation to address global challenges.</p>
          <p>Partnerships: We pledge to build and strengthen partnerships across governments, international organizations, civil society, and the private sector to promote peace, security, and sustainable development.</p>
          <p>Solidarity: We commit to acting in solidarity with one another, providing support and assistance to those in need, especially in times of crisis and disaster.</p>
          <h3 className="font-semibold">Article 5: Implementation and Monitoring</h3>
          <p>Accountability: All signatories agree to establish mechanisms for monitoring and reporting on the implementation of this declaration, ensuring transparency and accountability.</p>
          <p>Review and Adaptation: We pledge to regularly review and adapt our commitments and actions in response to changing global circumstances, ensuring the continued relevance and effectiveness of this declaration.</p>
          <p>Digital Validation: This declaration will be validated and signed by individuals and organizations worldwide using digital identities in the form of Non-Fungible Tokens (NFTs), ensuring widespread endorsement and commitment.</p>
          <h3 className="font-semibold">Conclusion</h3>
          <p>In signing this Universal Declaration of Peace, we, the peoples of the world, reaffirm our shared commitment to a peaceful, just, and sustainable future for all. Together, we will build a world where everyone can live in dignity, free from fear and want, in harmony with one another and our planet.</p>

          <h3 className="font-semibold">Announcing Our Upcoming Hackathon!</h3>
          <p>We are hosting a 72-hour hackathon focused on deep development and innovation. Join us for an on-site hackathon in Tulum, taking place from September 17th to 19th, with online participation available as well.</p>
          <a href="https://idfsto08yl2.typeform.com/to/QByPVh81" target="_blank" rel="noopener noreferrer">
            <button className="bg-elegant-white text-box-color p-4 rounded">Join The Hackathon</button>
          </a>
        </div>

        {/* Firmas y Lista de Signatarios */}
        <div className="grid grid-cols-2 gap-4 mb-15">
          {/* Formulario de firma */}
          <div className="bg-box-color text-elegant-white p-6 rounded-lg shadow-lg border border-[#68b4c8] h-64">
            <h2 className="text-2xl font-bold mb-4">Sign the Declaration</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full p-2 mb-4 border border-gray-300 rounded"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full p-2 mb-4 border border-gray-300 rounded"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
              <input
                type="text"
                placeholder="Enter your country"
                className="w-full p-2 mb-4 border border-gray-300 rounded"
                value={formData.country}
                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                required
              />
              <textarea
                placeholder="What actions can you take to help achieve peace?"
                className="w-full p-2 mb-4 border border-gray-300 rounded"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
              ></textarea>

              <div className="flex justify-between button-group">
                <ConnectButton
                  client={client}
                  wallets={wallets}
                  theme={darkTheme({
                    colors: {
                      modalBg: "#072136",
                      secondaryIconColor: "#ffffff",
                    },
                  })}
                  connectModal={{ size: "compact" }}
                  accountAbstraction={{
                    chain: optimismSepolia,
                    sponsorGas: true,
                  }}
                  onConnect={handleConnect}
                  disabled={isConnected} // Deshabilitar después de la conexión
                />
                <button
                  type="submit"
                  className={`w-full bg-elegant-white text-box-color p-4 rounded ${!isConnected ? "opacity-50 cursor-not-allowed" : ""}`}
                  disabled={!isConnected || loading}
                >
                  {loading ? "Submitting..." : "Submit"}
                </button>
              </div>

              {submitSuccess && <p className="text-green-500 mt-2">Thank you for signing!</p>}
            </form>
          </div>

                   {/* Lista de Signatarios */}
                   <div className="bg-box-color text-elegant-white p-6 rounded-lg shadow-lg border border-[#68b4c8] h-96 overflow-y-scroll">
            <h2 className="text-2xl font-bold mb-4">Signatories</h2>
            <ul>
              {signatories.map((signatory) => (
                <li key={signatory.id} className="mb-4">
                  <strong>{signatory.name}</strong> ({signatory.country}): {signatory.message}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}
