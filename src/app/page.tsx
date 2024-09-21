"use client";

import { useState } from "react";
import { ConnectButton, darkTheme } from "thirdweb/react";
import { client } from "./client";
import { inAppWallet, createWallet } from "thirdweb/wallets";
import { ethereum } from "thirdweb/chains";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useTranslation } from "next-i18next";
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

const initialSignatories = [
  { name: "John Doe", country: "USA", message: "Peace and love for everyone." },
  { name: "Jane Smith", country: "Canada", message: "Unity through diversity." },
];

export default function Home() {
  const { t } = useTranslation();
  const [signatories, setSignatories] = useState(initialSignatories);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    country: "",
    message: "",
  });
  const [isConnected, setIsConnected] = useState(false);

  const handleConnect = () => {
    setIsConnected(true);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSignatories([...signatories, formData]);
    setFormData({ name: "", email: "", country: "", message: "" });
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
          <h2 className="text-4xl font-bold mb-6 text-center">Universal Declaration Of Peace</h2>
          <p className="mb-4 text-xl font-semibold">A Global Commitment to Peace, Justice, and Sustainable Development</p>
          <p className="mb-4">
            In recognition of our shared humanity and the need for a harmonious coexistence, we, the peoples of the world, represented by our governments, organizations, and individuals, hereby declare our collective commitment to peace, justice, and sustainable development...
          </p>

          {/* Reproductor de video de YouTube */}
          <div className="mb-10">
            <iframe
              width="750"
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
          <h3 className="font-semibold">Conclusion</h3>
          <p>In signing this Universal Declaration of Peace, we, the peoples of the world, reaffirm our shared commitment to a peaceful, just, and sustainable future for all...</p>

          <h3 className="font-semibold">Announcing Our Upcoming Hackathon!</h3>
          <p>We are hosting a 72-hour hackathon focused on deep development and innovation...</p>
          <a href="https://idfsto08yl2.typeform.com/to/QByPVh81" target="_blank" rel="noopener noreferrer">
            <button className="bg-elegant-white text-box-color p-4 rounded">Join The Hackathon</button>
          </a>
        </div>

        {/* Firmas y Lista de Signatarios */}
        <div className="grid grid-cols-2 gap-6 mb-10">
          {/* Formulario de firma */}
          <div className="bg-box-color text-elegant-white p-6 rounded-lg shadow-lg border border-[#68b4c8] h-64">
            <h2 className="text-2xl font-bold mb-4">{t("Sign the Declaration")}</h2>
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
                    chain: ethereum,
                    sponsorGas: true,
                  }}
                  onConnect={handleConnect}
                />
                <button 
                  type="submit" 
                  className={`w-full bg-elegant-white text-box-color p-4 rounded ${!isConnected ? "opacity-50 cursor-not-allowed" : ""}`} 
                  disabled={!isConnected}
                >
                  {t("Submit")}
                </button>
              </div>
            </form>
          </div>

          {/* Lista de Signatarios */}
          <div className="bg-box-color text-elegant-white p-6 rounded-lg shadow-lg border border-[#68b4c8] h-96 overflow-y-scroll">
            <h2 className="text-2xl font-bold mb-4">{t("Signatories")}</h2>
            <ul>
              {signatories.map((signatory, index) => (
                <li key={index} className="mb-4">
                  <strong>{signatory.name}</strong> ({signatory.country}): {signatory.message}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Mapa */}
        <MapContainer
          center={[51.505, -0.09]}
          zoom={13}
          scrollWheelZoom={false}
          className="w-full h-96 rounded-lg shadow-lg"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {signatories.map((signatory, index) => (
            <Marker key={index} position={[51.505 + index * 0.01, -0.09]}>
              <Popup>
                {signatory.name} ({signatory.country}): {signatory.message}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </main>
  );
}
