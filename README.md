Readme File

# CryptoRadar - Crypto Price Alert System

CryptoRadar is a decentralized cryptocurrency price alert system that notifies users when specific cryptocurrency price thresholds are met. Built on blockchain technology, the system leverages smart contracts to securely store and automate alert conditions, ensuring transparency and trust without relying on centralized servers.

## Features
- **Blockchain-Based Alerts**: Users can set, modify, and deactivate alerts directly from their wallets.
- **Real-Time Price Data**: Integrated with decentralized oracles for accurate and timely alerts.
- **Immutability & Security**: All actions are recorded immutably on the blockchain.
- **No Centralized Servers**: The entire system runs decentralized, ensuring trustless operation.
- **SMS Notifications**: Users can receive SMS alerts when price thresholds are met.


## Vision

The vision of CryptoRadar is to empower cryptocurrency enthusiasts and DeFi users by providing a decentralized, secure, and transparent platform for real-time price alerts. By leveraging blockchain technology and smart contracts, CryptoRadar aims to eliminate the need for centralized systems, ensuring that users can set, modify, and track their alerts directly from their wallets with complete control over their data. The platform seeks to enhance market monitoring, enabling users to make timely, informed decisions in the rapidly evolving cryptocurrency market.

## Smart Contract Information

The backend of the CryptoRadar platform is powered by a smart contract written in the Move language and deployed on the Aptos blockchain. Key details of the contract:

### Contract Functions

- **Create Alert:**
    - **Function**: `create_alert(account: &signer, crypto_id: vector<u8>, price: u128)`
    - **Purpose**: Allows users to create a new price alert for a specific cryptocurrency.

- **Deactivate Alert:**
    - **Function**: `deactivate_alert(account: address, crypto_id: vector<u8>)`
    - **Purpose**: Deactivates an existing alert for a specific cryptocurrency.

- **Get Alerts:**
    - **Function**: `get_alerts(account: address): vector<Alert>`
    - **Purpose**: Retrieves all active alerts for a user.

### Contract Details

- **Transaction Hash**: `0x1facbedf4d72627d39bfba6fb3753623257f19faadd35e9ac06e370da4185f0e`
- **Sender Address**: `0x7c4c26e16031ef4d298582ff295c31eaa0b04110d5f54bc546130c4173344f42`
- **Network**: Aptos
- **Module**: `CryptoRadar`

### Deployment

- **Transaction Hash**: [Link]([https://explorer.aptoslabs.com/txn/41912873?network=devnet](https://explorer.aptoslabs.com/txn/0x1facbedf4d72627d39bfba6fb3753623257f19faadd35e9ac06e370da4185f0e/userTxnOverview?network=devnet))
- **Coin Used**: Aptos Coin (APT)

The contract utilizes resources such as `Alert` and `Alerts` to manage user alerts, and functions are available for creating, deactivating, and fetching alerts for users. All actions are recorded securely on the Aptos blockchain.

## Run Locally

Make sure you have the Petra Wallet installed in your web browser. Log in to Petra and switch to devnet in the wallet.

Clone the project

```bash
  git clone 
```

Go to the server of the project directory

```bash
  cd CryptoRadar/backend
```

Install dependencies

```bash
  npm install
```

Start the backend server

```bash
  node index.js
```

Go to the frontend of the project directory

```bash
  cd CryptoRadar/frontend
```

Install dependencies

```bash
  npm install
```

Start the frontend server

```bash
  npm start
```

## Video Link
[Video Link](https://youtu.be/nokuZnu5PZg)

## Images of the Interface


