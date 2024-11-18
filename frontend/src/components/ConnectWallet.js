import React, { useState } from 'react';

const ConnectWallet = ({ onConnect }) => {
  const [walletAddress, setWalletAddress] = useState('');
  const [connected, setConnected] = useState(false);

  const connectWallet = async () => {
    if (window.aptos) {
      try {
        // Request wallet connection
        const account = await window.aptos.connect();
        setWalletAddress(account.address);
        setConnected(true);

        // Pass the wallet address to the parent component
        if (onConnect) {
          onConnect(account.address);
        }
      } catch (error) {
        console.error('Error connecting to wallet:', error);
        alert('Failed to connect wallet. Ensure you have an Aptos wallet installed.');
      }
    } else {
      alert('Aptos wallet not found. Please install a compatible wallet.');
    }
  };

  return (
    <div>
      {!connected ? (
        <button onClick={connectWallet} style={{ padding: '10px 20px', fontSize: '16px' }}>
          Connect Wallet
        </button>
      ) : (
        <p>Connected Wallet Address: {walletAddress}</p>
      )}
    </div>
  );
};

export default ConnectWallet;
