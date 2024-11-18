import { AptosClient, TxnBuilderTypes, BCS } from "aptos";

const client = new AptosClient("https://fullnode.devnet.aptoslabs.com"); // Update with your network URL if needed

/**
 * Function to create an alert on the blockchain.
 * @param {Object} wallet - The wallet object containing private key and address.
 * @param {string} cryptoId - The ID of the cryptocurrency for the alert.
 * @param {number} price - The price threshold for the alert.
 * @returns {Object} - The response from the blockchain transaction.
 * @param {string} accountAddress - The address of the account to fetch alerts from.
 */

export const getAlerts = async (accountAddress) => {
  try {
    console.log("Fetching alerts for address:", accountAddress); // Log the account address

    const response = await client.getAccountResource(
      accountAddress,  // The account address to fetch alerts for
      "0x7c4c26e16031ef4d298582ff295c31eaa0b04110d5f54bc546130c4173344f42::CryptoRadar::Alerts",  // Full module path and function name
      []  // No arguments needed for get_alerts
    );
    
    console.log("Response from get_alerts:", response); // Log the response

    return response || []; // Return empty array if no response is received
  } catch (error) {
    console.error("Error fetching alerts:", error);
    throw error;
  }
};

export const createAlert = async (signer, cryptoId, price) => {
  if (!signer || typeof signer.signAndSubmitTransaction !== "function") {
    throw new Error("Invalid wallet. Please connect your wallet.");
  }

  const payload = {
    type: "entry_function_payload",
    function: "0x7c4c26e16031ef4d298582ff295c31eaa0b04110d5f54bc546130c4173344f42::CryptoRadar::create_alert",
    arguments: [cryptoId, price],
    type_arguments: [],
  };

  try {
    // Use `signAndSubmitTransaction` from the window.aptos object
    const transaction = await window.aptos.signAndSubmitTransaction(payload);
    console.log('Alert Created:', transaction);
    return transaction;
  } catch (error) {
    console.error('Error creating alert:', error);
    throw error;
  }
};

export const deactivateAlert = async (senderAddress, cryptoId) => {
  try {
    // Ensure the wallet is available
    if (!window.aptos || typeof window.aptos.signAndSubmitTransaction !== "function") {
      throw new Error("Aptos wallet not connected or unavailable.");
    }

    // Remove the '0x' prefix from the cryptoId string if present
    if (cryptoId.startsWith('0x')) {
      cryptoId = cryptoId.slice(2);
    }

    // Convert the cryptoId (e.g., "425443") into a vector<u8> (array of bytes)
    const bytes = new Uint8Array(cryptoId.match(/.{1,2}/g).map((byte) => parseInt(byte, 16)));

    // Transaction payload with sender address and the crypto ID as a vector<u8>
    const payload = {
      type: "entry_function_payload",
      function: "0x7c4c26e16031ef4d298582ff295c31eaa0b04110d5f54bc546130c4173344f42::CryptoRadar::deactivate_alert", // Correct function path
      arguments: [senderAddress, bytes], // Pass the sender address and cryptoId as a vector<u8>
      type_arguments: [],
    };

    // Sign and submit the transaction
    const response = await window.aptos.signAndSubmitTransaction(payload);
    console.log("Transaction response:", response);

    // Optionally, wait for the transaction to be confirmed
    return response;
  } catch (error) {
    console.error("Error deactivating alert:", error);
    throw error;
  }
};




