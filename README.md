# 🔐 Vault – Decentralized Data Verification System (Aptos)

> A lightweight Web3 system for tamper-proof data verification using cryptographic hashing.

---

## 🚀 Overview

Vault is a Web3-based experimental system designed to explore decentralized data verification using the Aptos blockchain.

In traditional systems, data can be modified without transparency or traceability. Vault introduces a verification layer where data integrity is ensured without relying on centralized authorities.

---

## 🧠 Core Idea

* Data is converted into a **cryptographic hash**
* Hashes are securely stored and tracked
* Records can be verified anytime for integrity

> ⚡ Vault ensures **data integrity, not data storage**

---

## 🔄 Data Flow

```text
User → Input Data → Generate Hash → Store in Vault → Verify Anytime
```

---

## ⚙️ Features

* ✅ Hash-based record storage (JSON simulation)
* ✅ Record verification mechanism
* ✅ Logging system for development tracking
* ✅ Modular backend architecture
* 🔄 Smart contract integration (in progress)

---

## 📡 API Endpoints

### ▶️ Store Data

`POST /store`

**Request**

```json
{
  "user": "aman",
  "data": "hello world"
}
```

**Response**

```json
{
  "status": "stored",
  "hash": "abc123xyz"
}
```

---

### ▶️ Verify Data

`POST /verify`

**Request**

```json
{
  "data": "hello world"
}
```

**Response**

```json
{
  "verified": true
}
```

---

### ▶️ Get All Records

`GET /records`

**Response**

```json
[
  {
    "user": "aman",
    "hash": "abc123xyz",
    "timestamp": "2026-03-27T10:00:00Z"
  }
]
```

---

## 📊 Development Status

| Feature                    | Status         |
| -------------------------- | -------------- |
| Hash Storage               | ✅ Completed    |
| Record Verification        | ✅ Completed    |
| Logging System             | ✅ Active       |
| Smart Contract Integration | 🔄 In Progress |
| Web3 UI (dApp)             | 🔄 Planned     |

---

## 🧪 Ongoing Development

* 🔄 Aptos Move smart contract integration
* 🔄 On-chain hash verification
* 🔄 IPFS / decentralized storage
* 🔄 Frontend dApp UI

---

## 🛠 Tech Stack

* **Aptos** – Blockchain layer (planned)
* **Node.js** – Backend logic
* **Express.js** – API layer
* **JSON** – Temporary storage simulation

---

## 📂 Project Structure

```bash
.
├── src/              # Core modules (hashing, vault logic)
├── app.js            # Main backend / API logic
├── vault.json        # Stored records (simulation)
├── network.json      # Network configuration
├── config.json       # App configuration
├── logs.txt          # Development logs
├── package.json      # Dependencies
└── README.md         # Documentation
```

---

## 🆕 Latest Updates (May 2026)

* ✅ Enhanced SHA-256 hashing utility
* ✅ Improved verification response system
* ✅ Optimized backend structure
* ✅ Better API workflow handling
* ✅ Updated documentation

---

## 🚀 Future Vision

* 🔄 Aptos Move smart contract deployment
* 🔄 Wallet connectivity
* 🔄 IPFS integration
* 🔄 On-chain verification
* 🔄 Frontend dashboard UI

---

## 📌 Development Notes

The architecture is being designed for:

* ⚡ Scalability
* 🔐 Security improvements
* ⚙️ Performance optimization
* 🌐 Full Web3 integration

---

## 📅 Recent Activity

**Latest Commit:**
`feat: improve verification flow and update documentation`

---

## 🤝 Contribution

This is an experimental Web3 project. Contributions, ideas, and feedback are welcome.

---

## ⚠️ Disclaimer

This project is for educational and experimental purposes only.
Not intended for production use yet.
