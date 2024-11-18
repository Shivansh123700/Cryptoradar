import React, { useEffect, useState } from "react";
import { getAlerts, deactivateAlert } from "../utils/contractUtils";  // Ensure this imports correctly
import axios from "axios";  // To fetch crypto price
import {Link} from "react-router-dom"
import Footer from "./Footer/Footer";
import logo from "../assets/logo_crypto.jpeg"

const Alerts = () => {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [phoneNumber, setPhoneNumber] = useState("+917668193033");  // Replace with user phone number
  const [walletAddress, setWalletAddress] = useState(null);  // Store wallet address
  const [statusMessage, setStatusMessage] = useState("");  // Add statusMessage for debugging

  const styles = {
    navbar: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 20px",
        backgroundColor: "#212ea0",
        color: "#fff",
        boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.2)",
      },
      navbarLogo: {
        display: "flex",
        alignItems: "center",
      },
      navbarLogoImage: {
        width: "40px",
        height: "40px",
        marginRight: "10px",
      },
      navbarLogoText: {
        fontSize: "20px",
        fontWeight: "bold",
      },
      navbarLinks: {
        display: "flex",
        gap: "20px",
      },
      navbarLink: {
        color: "#fff",
        textDecoration: "none",
        fontSize: "16px",
        fontWeight: "bold",
        transition: "color 0.3s ease",
      },
      navbarLinkHover: {
        color: "#ddd",
      },
    container: {
      padding: '20px',
      fontFamily: "'Arial', sans-serif",
      backgroundColor: '#f4f4f9',
      borderRadius: '10px',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
      maxWidth: '900px',
      margin: '0 auto',
      marginTop:"100px"
    },
    title: {
      textAlign: 'center',
      color: '#333',
      fontSize: '24px',
    },
    connectWalletBtn: {
      backgroundColor: '#4caf50',
      color: 'white',
      padding: '10px 20px',
      border: 'none',
      cursor: 'pointer',
      borderRadius: '5px',
      fontSize: '16px',
      display: 'block',
      margin: '0 auto',
    },
    connectWalletBtnHover: {
      backgroundColor: '#45a049',
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      marginTop: '20px',
      backgroundColor: '#fff',
      borderRadius: '8px',
      overflow: 'hidden',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    },
    th: {
      padding: '12px 15px',
      textAlign: 'left',
      backgroundColor: '#007bff',
      color: 'white',
      fontSize: '16px',
    },
    td: {
      padding: '12px 15px',
      textAlign: 'left',
      backgroundColor: '#f9f9f9',
      color: '#333',
    },
    trHover: {
      backgroundColor: '#f1f1f1',
    },
    activeRow: {
      backgroundColor: '#e0ffe0',
    },
    inactiveRow: {
      backgroundColor: '#ffe0e0',
    },
    deactivateBtn: {
      backgroundColor: '#ff6347',
      color: 'white',
      padding: '8px 16px',
      border: 'none',
      cursor: 'pointer',
      borderRadius: '5px',
    },
    deactivateBtnHover: {
      backgroundColor: '#ff4500',
    },
    statusMessage: {
      fontSize: '16px',
      color: '#555',
      textAlign: 'center',
      marginTop: '20px',
    },
  };
  // Function to connect to the wallet
  const connectWallet = async () => {
    try {
      if (window.aptos && typeof window.aptos.connect === "function") {
        const wallet = await window.aptos.connect();
        const account = await window.aptos.account();
        setWalletAddress(account.address);
        console.log("Wallet connected:", account.address);
      } else {
        console.error("Aptos wallet extension not found.");
      }
    } catch (error) {
      console.error("Error connecting wallet:", error);
    }
  };

  // Function to fetch the alerts of the connected wallet
  const fetchAlerts = async () => {
    if (!walletAddress) {
      console.error("Wallet not connected.");
      return;
    }

    setLoading(true);
    try {
      const response = await getAlerts(walletAddress);
      setAlerts(response.data.user_alerts);
    } catch (error) {
      console.error("Error fetching alerts:", error);
    } finally {
      setLoading(false);
    }
  };

  // Function to fetch the current price of a crypto (you can use a price API here)
  const getCryptoPrice = async (cryptoId) => {
    // CoinAPI expects uppercase asset IDs like BTC, ETH
    const cryptoIds = decodeCryptoId(cryptoId)
    console.log(cryptoIds)
    const url = `https://rest.coinapi.io/v1/exchangerate/${cryptoId.toUpperCase()}`;
  
    try {
      const response = await axios.get(url, {
        headers: {
          "X-CoinAPI-Key": "EFBAE483-3F58-497A-B174-E0BACCBE5D4B",
        },
      });
  
      // Extract USD rate from the rates array
      const usdRate = response.data.rates.find((rate) => rate.asset_id_quote === "USD");
  
      // Log the full response for debugging (optional)
      console.log(response.data);
  
      // Return only the USD rate or 0 if not found
      return usdRate ? usdRate.rate : 0;
    } catch (error) {
      console.error("Error fetching crypto price:", error.response?.data || error.message);
      return 0;
    }
  };

  // Function to send SMS via Twilio
  const sendTwilioSMS = async (message) => {
    try {
      const response = await axios.post("http://localhost:8000/api/send_sms", {  
        body:message,
        from:"+19562783738",
        to: phoneNumber,
        
      });
      console.log("SMS sent successfully:", response.data);
      setStatusMessage("SMS sent successfully!");  // Update statusMessage for UI
    } catch (error) {
      console.error("Error sending SMS:", error);
      setStatusMessage("Error sending SMS.");  // Update statusMessage for UI
    }
  };

  const decodeCryptoId = (cryptoIdHex) => {
    const hex = cryptoIdHex.startsWith("0x") ? cryptoIdHex.slice(2) : cryptoIdHex;
    const bytes = new Uint8Array(hex.match(/.{1,2}/g).map((byte) => parseInt(byte, 16)));
    const decoder = new TextDecoder();
    return decoder.decode(bytes);
  };

  const handleDeactivate = async (cryptoId) => {
    try {
      if (!window.aptos) {
        alert("Please connect your wallet.");
        return;
      }
  
      const walletAddress = (await window.aptos.account()).address;
      console.log(walletAddress)
  
      console.log(`Deactivating alert for crypto ID: ${cryptoId}, from sender: ${walletAddress}`);
      
      await deactivateAlert(walletAddress, cryptoId);
      alert("Alert deactivated successfully!");
  
      fetchAlerts();
    } catch (error) {
      console.error("Error deactivating alert:", error);
      alert("Failed to deactivate alert. Please try again.");
    }
  };

  const checkAlertsAndSendNotification = async () => {
    setStatusMessage("Checking for alerts...");  // Update status message to indicate checking
    console.log("Checking for alerts...");
    for (let alert of alerts) {
      const currentPrice = await getCryptoPrice(decodeCryptoId(alert.crypto_id));
      if (currentPrice >= parseInt(alert.price_threshold, 10)) {
        const cryId = decodeCryptoId(alert.crypto_id);
        setStatusMessage("Sending alert...");  // Update status message to indicate sending alert
        console.log(`Alert triggered! ${cryId} reached price: ${currentPrice}`);
        sendTwilioSMS(`Price alert triggered! ${cryId} has reached ${currentPrice}`);
      }
    }
  };

  useEffect(() => {
    if (walletAddress) {
      fetchAlerts();  // Fetch alerts when the wallet is connected
    }
  }, [walletAddress]);  // Run effect only when walletAddress changes

  useEffect(() => {
    if (walletAddress) {
      const interval = setInterval(() => {
        checkAlertsAndSendNotification();  
      }, 30000);

      return () => clearInterval(interval);  
    }
  }, [walletAddress, alerts]);  

  return (
        <div>
      {/* Navbar */}
      <nav style={styles.navbar}>
      <div style={{ display: "flex", alignItems: "center" }}>
      <img
        src={logo} // Replace with your logo image path
        alt="Logo"
        style={{ width: "150px", height: "40px", marginRight: "10px" }}
      />
      
    </div>


        <div style={styles.navbarLinks}>
          <Link
            to="/home"
            style={styles.navbarLink}
            onMouseOver={(e) => (e.target.style.color = styles.navbarLinkHover.color)}
            onMouseOut={(e) => (e.target.style.color = "#fff")}
          >
            Home
          </Link>
          <Link
            to="/alerts"
            style={styles.navbarLink}
            onMouseOver={(e) => (e.target.style.color = styles.navbarLinkHover.color)}
            onMouseOut={(e) => (e.target.style.color = "#fff")}
          >
            Alerts
          </Link>
          <Link
            to="/about"
            style={styles.navbarLink}
            onMouseOver={(e) => (e.target.style.color = styles.navbarLinkHover.color)}
            onMouseOut={(e) => (e.target.style.color = "#fff")}
          >
            About
          </Link>
        </div>
      </nav>
    
    <div style={styles.container}>
      <h2 style={styles.title}>Your Alerts</h2>
      {!walletAddress ? (
        <button 
          onClick={connectWallet} 
          style={styles.connectWalletBtn} 
          onMouseOver={(e) => e.target.style.backgroundColor = styles.connectWalletBtnHover.backgroundColor}
          onMouseOut={(e) => e.target.style.backgroundColor = styles.connectWalletBtn.backgroundColor}
        >
          Connect Wallet
        </button>
      ) : (
        <>
          <p>Connected Wallet: {walletAddress}</p>
          {loading ? (
            <p>Loading alerts...</p>
          ) : alerts.length > 0 ? (
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Crypto ID</th>
                  <th style={styles.th}>Price Threshold</th>
                  <th style={styles.th}>Status</th>
                  <th style={styles.th}>Action</th>
                </tr>
              </thead>
              <tbody>
                {alerts.map((alert, index) => {
                  const cryptoId = decodeCryptoId(alert.crypto_id);
                  const priceThreshold = parseInt(alert.price_threshold, 10);
                  const status = alert.is_active ? "Active" : "Inactive";

                  return (
                    <tr key={index} style={alert.is_active ? styles.activeRow : styles.inactiveRow}>
                      <td style={styles.td}>{cryptoId}</td>
                      <td style={styles.td}>${priceThreshold}</td>
                      <td style={styles.td}>{status}</td>
                      <td style={styles.td}>
                        {alert.is_active && (
                          <button 
                            onClick={() => handleDeactivate(alert.crypto_id)} 
                            style={styles.deactivateBtn} 
                            onMouseOver={(e) => e.target.style.backgroundColor = styles.deactivateBtnHover.backgroundColor}
                            onMouseOut={(e) => e.target.style.backgroundColor = styles.deactivateBtn.backgroundColor}
                          >
                            Deactivate
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <p>No alerts found.</p>
          )}
        </>
      )}
      <p style={styles.statusMessage}>{statusMessage}</p>
    </div>
    <Footer/>
    </div>
    
  );

};

export default Alerts;
