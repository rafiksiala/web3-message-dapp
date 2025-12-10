
# Message dApp (Sepolia)

This is a simple Web3 decentralized application (dApp) that interacts with a
HelloWorld smart contract deployed on the **Sepolia testnet**.

The dApp allows users to:

- Connect their MetaMask wallet  
- Read the current on-chain message  
- Submit a new message (on-chain transaction using `setMessage`)  

This project is built using:

- **Hardhat 3** (smart contracts + deployment)
- **Solidity 0.8.28**
- **Ethers.js v6**
- **MetaMask**
- A minimal **HTML + JavaScript frontend**

---

## Smart Contract

The smart contract is deployed on Sepolia at:

```
0xE913A381F9b5f28eE49E6Fc929Da7C607580C870
```

Contract source:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract HelloWorld {
    string private message;
    event MessageChanged(string newMessage);

    constructor(string memory _message) {
        message = _message;
    }

    function getMessage() external view returns (string memory) {
        return message;
    }

    function setMessage(string memory _message) external {
        message = _message;
        emit MessageChanged(_message);
    }
}
````

---

## Frontend

The entire frontend is contained in `index.html`, `script.js`, and `helloworld-abi.js`.

It uses `ethers.umd.min.js` from a CDN and communicates with the deployed
contract using MetaMask as a provider.

### Features

* Connect wallet button
* Display connected address
* Read on-chain message
* Submit a new message (requires Sepolia ETH)
* Display transaction hash and status
* Fully compatible with MetaMask

---

## Run Locally

Clone the repo:

```bash
git clone https://github.com/<your-username>/web3-message-dapp.git
cd web3-message-dapp
```

You **must** use a local server to run the dApp (MetaMask does not work
with `file://` links).

### Option 1: VS Code Live Server (recommended)

Right-click `index.html` → **Open with Live Server**

Your dApp will be available at:

```
http://localhost:5500/
```

### Option 2: GitHub Pages (online version)

You can access the live deployed version here:

```
https://rafiksiala.github.io/web3-message-dapp/
```

---

## Smart Contract Interaction

The dApp interacts with the deployed contract using the ABI defined in:

```
helloworld-abi.js
```

Example ABI:

```js
window.HELLOWORLD_ABI = [
  "function getMessage() view returns (string)",
  "function setMessage(string _message)"
];
```

Ethers.js v6 is used to:

* Create a `BrowserProvider` with MetaMask
* Connect a `Signer`
* Instantiate the contract
* Call read/write functions

---

## Network

Make sure MetaMask is set to:

 **Ethereum Sepolia Testnet**

If it does not appear, enable test networks:

Settings → Advanced → *Show test networks*.

You will also need Sepolia ETH for gas (free faucet):

[https://sepoliafaucet.com/](https://sepoliafaucet.com/)

---

## Example Flow

1. Connect wallet
2. Click **Read Message**
3. Type a new message
4. Click **Send Transaction**
5. Confirm in MetaMask
6. Wait for confirmation
7. The message updates on-chain

You can verify all transactions on:

[https://sepolia.etherscan.io/address/0xE913A381F9b5f28eE49E6Fc929Da7C607580C870](https://sepolia.etherscan.io/address/0xE913A381F9b5f28eE49E6Fc929Da7C607580C870)

---

## Deployment (optional)

To redeploy the smart contract using Hardhat Ignition:

```bash
npx hardhat ignition deploy ignition/modules/HelloWorld.ts --network sepolia
```

Scripts for reading and updating the contract are available in the backend.

---


## 👨‍💻 Author

Built by **Rafik Siala**
Web3 developer in training 🚀
