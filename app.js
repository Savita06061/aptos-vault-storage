const fs = require("fs");
const crypto = require("crypto");

const VAULT_FILE = "vault.json";

/* -----------------------------
   Initialize Vault
------------------------------*/
function initVault() {
  if (!fs.existsSync(VAULT_FILE)) {
    const initial = { data: [] };
    fs.writeFileSync(VAULT_FILE, JSON.stringify(initial, null, 2));
    console.log("✅ Vault file created");
  }
}

/* -----------------------------
   Read Vault
------------------------------*/
function readVault() {
  try {
    const raw = fs.readFileSync(VAULT_FILE);
    return JSON.parse(raw);
  } catch (err) {
    console.error("❌ Error reading vault:", err);
    return { data: [] };
  }
}

/* -----------------------------
   Save Vault
------------------------------*/
function saveVault(vault) {
  fs.writeFileSync(VAULT_FILE, JSON.stringify(vault, null, 2));
}

/* -----------------------------
   Create Hash
------------------------------*/
function createHash(input) {
  return crypto.createHash("sha256").update(input).digest("hex");
}

/* -----------------------------
   Add record to vault
------------------------------*/
function addRecord(user, data) {
  const vault = readVault();
  const hash = createHash(data);

  const entry = {
    id: Date.now().toString(), // 🔥 unique id added
    user,
    data, // 🔥 store original data (optional but useful)
    hash,
    createdAt: new Date().toISOString()
  };

  const already = vault.data.find(r => r.hash === hash);

  if (already) {
    console.log("⚠️ Record already exists in vault");
    return already;
  }

  vault.data.push(entry);
  saveVault(vault);

  console.log("✅ New vault entry stored");
  return entry;
}

/* -----------------------------
   Verify record
------------------------------*/
function verifyRecord(data) {
  const vault = readVault();
  const hash = createHash(data);

  const record = vault.data.find(r => r.hash === hash);

  if (record) {
    console.log("✅ Record verified");
    return record;
  } else {
    console.log("❌ No matching record found");
    return null;
  }
}

/* -----------------------------
   List vault records
------------------------------*/
function listRecords() {
  const vault = readVault();

  console.log("📂 Vault Records:");
  vault.data.forEach((r, i) => {
    console.log(`${i + 1}. ${r.user} - ${r.hash}`);
  });

  return vault.data;
}

/* -----------------------------
   Validate hash (FIXED BUG)
------------------------------*/
function validateHash(hash) {
  const vault = readVault();
  return vault.data.some(r => r.hash === hash);
}

/* -----------------------------
   Export functions (🔥 important)
------------------------------*/
module.exports = {
  addRecord,
  verifyRecord,
  listRecords,
  validateHash,
  createHash
};

/* -----------------------------
   Start script (for testing)
------------------------------*/
initVault();

// test entries
addRecord("test1", "sample data 1");
addRecord("aman", "test file data");

// verify
verifyRecord("test file data");

// show vault
listRecords();
