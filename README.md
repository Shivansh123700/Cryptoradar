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

- **Transaction Hash**: [Link](https://explorer.aptoslabs.com/txn/0x1facbedf4d72627d39bfba6fb3753623257f19faadd35e9ac06e370da4185f0e/userTxnOverview?network=devnet)
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

## Images

<img width="1440" alt="Transaction Smart contract" src="https://github.com/user-attachments/assets/89dbb0b1-2210-4810-8b66-3823b9bddda7">

### Image of the Landing Page

<img width="1440" alt="Screenshot 2024-11-18 at 7 05 43 PM" src="https://github.com/user-attachments/assets/fa304e54-63f4-455b-94a2-1656280d863a">

<img width="1440" alt="Screenshot 2024-11-18 at 7 05 55 PM" src="https://github.com/user-attachments/assets/762e0d8e-41ad-4c96-9c7d-c134f0df9bca">

### Image of the Home Page

<img width="1439" alt="Screenshot 2024-11-18 at 7 06 27 PM" src="https://github.com/user-attachments/assets/b1c8cf83-6f74-448e-8e7b-0d49baa45abe">

<img width="1439" alt="Screenshot 2024-11-18 at 7 06 37 PM" src="https://github.com/user-attachments/assets/72fce3d0-dfc1-4396-8274-4e30eb2865f0">

### Image of the Alerts Page

<img width="1440" alt="Screenshot 2024-11-18 at 7 06 49 PM" src="https://github.com/user-attachments/assets/bc8bd320-aceb-49ab-82da-ebd6ebf6776a">

<img width="1440" alt="Screenshot 2024-11-18 at 7 07 05 PM" src="https://github.com/user-attachments/assets/8e2bcd53-062d-4160-afdf-952f74c7498b">







