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
    console.log("✅ Vault initialized");
  }
}

/* -----------------------------
   Read Vault
------------------------------*/
function readVault() {
  try {
    const raw = fs.readFileSync(VAULT_FILE, "utf-8");
    return JSON.parse(raw);
  } catch (err) {
    console.error("❌ Error reading vault:", err.message);
    return { data: [] };
  }
}

/* -----------------------------
   Save Vault
------------------------------*/
function saveVault(vault) {
  try {
    fs.writeFileSync(VAULT_FILE, JSON.stringify(vault, null, 2));
  } catch (err) {
    console.error("❌ Error saving vault:", err.message);
  }
}

/* -----------------------------
   Create Hash (Enhanced)
------------------------------*/
function createHash(input) {
  if (!input) {
    throw new Error("Invalid input for hashing");
  }
  return crypto.createHash("sha256").update(input).digest("hex");
}

/* -----------------------------
   Add record to vault
------------------------------*/
function addRecord(user, data) {
  if (!user || !data) {
    console.log("⚠️ User and data are required");
    return null;
  }

  const vault = readVault();
  const hash = createHash(data);

  const existing = vault.data.find(r => r.hash === hash);
  if (existing) {
    console.log("⚠️ Record already exists");
    return existing;
  }

  const entry = {
    id: crypto.randomUUID(), // 🔥 improved unique ID
    user,
    data,
    hash,
    createdAt: new Date().toISOString()
  };

  vault.data.push(entry);
  saveVault(vault);

  console.log("✅ Record stored successfully");
  return entry;
}

/* -----------------------------
   Verify record
------------------------------*/
function verifyRecord(data) {
  if (!data) {
    console.log("⚠️ Data required for verification");
    return null;
  }

  const vault = readVault();
  const hash = createHash(data);

  const record = vault.data.find(r => r.hash === hash);

  if (record) {
    console.log("✅ Record verified");
    return { verified: true, record };
  }

  console.log("❌ No matching record found");
  return { verified: false };
}

/* -----------------------------
   List vault records
------------------------------*/
function listRecords() {
  const vault = readVault();

  console.log(`📂 Total Records: ${vault.data.length}`);
  vault.data.forEach((r, i) => {
    console.log(`${i + 1}. ${r.user} | ${r.hash.slice(0, 10)}...`);
  });

  return vault.data;
}

/* -----------------------------
   Validate hash
------------------------------*/
function validateHash(hash) {
  if (!hash) return false;

  const vault = readVault();
  return vault.data.some(r => r.hash === hash);
}

/* -----------------------------
   Delete record (NEW FEATURE)
------------------------------*/
function deleteRecord(hash) {
  const vault = readVault();
  const updated = vault.data.filter(r => r.hash !== hash);

  if (updated.length === vault.data.length) {
    console.log("⚠️ No record found to delete");
    return false;
  }

  vault.data = updated;
  saveVault(vault);

  console.log("🗑️ Record deleted");
  return true;
}

/* -----------------------------
   Export functions
------------------------------*/
module.exports = {
  addRecord,
  verifyRecord,
  listRecords,
  validateHash,
  createHash,
  deleteRecord // 🔥 new export
};

/* -----------------------------
   Run only if executed directly
------------------------------*/
if (require.main === module) {
  initVault();

  console.log("\n🚀 Running Vault Demo...\n");

  addRecord("aman", "test file data");
  verifyRecord("test file data");
  listRecords();
}
