import React, { useState } from "react";
import { createAlert } from "../utils/contractUtils";
import { Link } from "react-router-dom";
import Footer from "./Footer/Footer.js";
import logo from "../assets/logo_crypto.jpeg"


const Home = () => {
  const [cryptoId, setCryptoId] = useState("");
  const [price, setPrice] = useState("");
  const [walletAddress, setWalletAddress] = useState(null);
  const [walletSigner, setWalletSigner] = useState(null); // Store the signer
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Function to connect to Petra Wallet
  const connectWallet = async () => {
    if (window.aptos) {
      try {
        const response = await window.aptos.connect();
        if (response.address) {
          setWalletAddress(response.address);
          setWalletSigner(window.aptos); // Save the signer
          setMessage("Wallet connected successfully!");
        } else {
          setMessage("Failed to connect wallet.");
        }
      } catch (error) {
        console.error("Error connecting to wallet:", error);
        setMessage("Error connecting to wallet. Please try again.");
      }
    } else {
      setMessage("Petra Wallet is not installed. Please install it.");
    }
  };

  const handleCreateAlert = async (e) => {
    e.preventDefault();
    if (!cryptoId || !price || !walletSigner) {
      setMessage("Please fill all fields and connect your wallet!");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      // Use the walletSigner (Petra Wallet) for signing the transaction
      const response = await createAlert(walletSigner, cryptoId, parseInt(price));
      setMessage(`Alert created successfully! Transaction Hash: ${response.hash}`);
    } catch (error) {
      setMessage("Error creating alert. Check console for details.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    // Navbar
    <div style={{ backgroundImage: "url(../bg.jpg)" }}>
  {/* Navbar */}
  <nav
    style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "10px 20px",
      backgroundColor: "#212ea0",
      color: "#fff",
      boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.2)",
    }}
  >
    {/* Logo */}
    <div style={{ display: "flex", alignItems: "center" }}>
      <img
        src={logo} // Replace with your logo image path
        alt="Logo"
        style={{ width: "150px", height: "40px", marginRight: "10px" }}
      />
      
    </div>

    {/* Navigation Links */}
    <div style={{ display: "flex", gap: "20px" }}>
      <Link
        to="/home"
        style={{
          color: "#fff",
          textDecoration: "none",
          fontSize: "16px",
          fontWeight: "bold",
          transition: "color 0.3s ease",
        }}
        onMouseOver={(e) => (e.target.style.color = "#ddd")}
        onMouseOut={(e) => (e.target.style.color = "#fff")}
      >
        Home
      </Link>
      <Link
        to="/alerts"
        style={{
          color: "#fff",
          textDecoration: "none",
          fontSize: "16px",
          fontWeight: "bold",
          transition: "color 0.3s ease",
        }}
        onMouseOver={(e) => (e.target.style.color = "#ddd")}
        onMouseOut={(e) => (e.target.style.color = "#fff")}
      >
        Alerts
      </Link>
      <Link
        to="/about"
        style={{
          color: "#fff",
          textDecoration: "none",
          fontSize: "16px",
          fontWeight: "bold",
          transition: "color 0.3s ease",
        }}
        onMouseOver={(e) => (e.target.style.color = "#ddd")}
        onMouseOut={(e) => (e.target.style.color = "#fff")}
      >
        About
      </Link>
    </div>
  </nav>
    {/* // Main Content */}

    <div
  className="home-container"
  style={{
    padding: "20px",
    maxWidth: "600px",
    margin: "auto",
    marginTop:"100px",
    fontFamily: "'Arial', sans-serif",
    border: "1px solid #ddd",
    borderRadius: "10px",
    backgroundColor: "#fefefe",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
    backgroundImage: "url(../bg.jpg)",
    
  }}
>
  <h2 style={{ textAlign: "center", fontSize: "24px", color: "#333" }}>
    Create a Crypto Price Alert
  </h2>
  {!walletAddress ? (
    <button
      onClick={connectWallet}
      className="connect-wallet-button"
      style={{
        display: "block",
        margin: "20px auto",
        padding: "10px 20px",
        fontSize: "16px",
        color: "#fff",
        backgroundColor: "#212ea0",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        transition: "background-color 0.3s ease",
      }}
      onMouseOver={(e) => (e.target.style.backgroundColor = "#0056b3")}
      onMouseOut={(e) => (e.target.style.backgroundColor = "#212ea0")}
    >
      Connect Wallet
    </button>
  ) : (
    <p
      style={{
        textAlign: "center",
        fontSize: "16px",
        color: "#555",
      }}
    >
      Connected to wallet: <strong>{walletAddress}</strong>
    </p>
  )}
  <form
    onSubmit={handleCreateAlert}
    style={{
      display: "flex",
      flexDirection: "column",
      gap: "15px",
      marginTop: "20px",
    }}
  >
    <label style={{ fontSize: "14px", color: "#555" }}>
      Crypto ID (e.g., BTC):
      <input
        type="text"
        value={cryptoId}
        onChange={(e) => setCryptoId(e.target.value)}
        required
        style={{
          width: "100%",
          padding: "8px",
          marginTop: "5px",
          fontSize: "14px",
          border: "1px solid #ccc",
          borderRadius: "4px",
        }}
      />
    </label>
    <label style={{ fontSize: "14px", color: "#555" }}>
      Price Threshold:
      <input
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        required
        style={{
          width: "100%",
          padding: "8px",
          marginTop: "5px",
          fontSize: "14px",
          border: "1px solid #ccc",
          borderRadius: "4px",
        }}
      />
    </label>
    <button
      type="submit"
      disabled={loading}
      style={{
        padding: "10px 20px",
        fontSize: "16px",
        backgroundColor: loading ? "#aaa" : "#212ea0",
        color: "#fff",
        border: "none",
        borderRadius: "5px",
        cursor: loading ? "not-allowed" : "pointer",
        transition: "background-color 0.3s ease",
      }}
    >
      {loading ? "Creating..." : "Create Alert"}
    </button>
  </form>
  {message && (
    <p
      className="message"
      style={{
        marginTop: "15px",
        textAlign: "center",
        color: message.startsWith("Error") ? "red" : "green",
        fontSize: "14px",
      }}
    >
      {message}
    </p>
  )}
</div>
<Footer/>
</div>

  );
};

export default Home;