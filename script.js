// Adresse du contrat HelloWorld sur Sepolia
const CONTRACT_ADDRESS = "0xE913A381F9b5f28eE49E6Fc929Da7C607580C870";

// ABI minimal généré automatiquement par Hardhat (lecture + écriture)
const ABI = [
  "function getMessage() view returns (string)",
  "function setMessage(string _message)",
];

// Récupérer les éléments du DOM
const connectButton = document.getElementById("connectButton");
const accountDisplay = document.getElementById("accountDisplay");
const readButton = document.getElementById("readButton");
const currentMessageDisplay = document.getElementById("currentMessage");
const updateButton = document.getElementById("updateButton");
const newMessageInput = document.getElementById("newMessageInput");
const txStatus = document.getElementById("txStatus");

let provider;
let signer;
let contract;

// -----------------------------
// 🔌 1. Connexion au wallet
// -----------------------------
connectButton.onclick = async () => {
  try {
    if (!window.ethereum) {
      alert("MetaMask non détecté !");
      return;
    }

    // Demander connexion à MetaMask
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    const userAddress = accounts[0];
    accountDisplay.textContent = userAddress;

    // Créer provider Ethers v6 connecté à MetaMask
    provider = new ethers.BrowserProvider(window.ethereum);

    // Signer (pour les transactions)
    signer = await provider.getSigner();

    // Instance du contrat
    contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);

    alert("Wallet connecté !");
  } catch (err) {
    console.error(err);
  }
};

// -----------------------------
// 📖 2. Lire le message depuis la blockchain
// -----------------------------
readButton.onclick = async () => {
  try {
    if (!contract) {
      alert("Connecte ton wallet d'abord !");
      return;
    }

    const message = await contract.getMessage();
    currentMessageDisplay.textContent = message;
  } catch (err) {
    console.error(err);
  }
};

// -----------------------------
// ✏️ 3. Mettre à jour le message
// -----------------------------
updateButton.onclick = async () => {
  try {
    if (!contract) {
      alert("Connecte ton wallet d'abord !");
      return;
    }

    const newMsg = newMessageInput.value.trim();
    if (!newMsg) {
      alert("Le message ne peut pas être vide");
      return;
    }

    txStatus.textContent = "⏳ Transaction en cours...";

    // Envoyer la transaction
    const tx = await contract.setMessage(newMsg);
    txStatus.textContent = "⏳ Transaction envoyée : " + tx.hash;

    // Attendre confirmation
    await tx.wait();
    txStatus.textContent = "✅ Transaction confirmée !";

    // Mettre à jour l’affichage
    currentMessageDisplay.textContent = await contract.getMessage();
  } catch (err) {
    console.error(err);
    txStatus.textContent = "❌ Erreur dans la transaction";
  }
};
