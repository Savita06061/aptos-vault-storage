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
    console.log("Vault file created");
  }
}

/* -----------------------------
   Read Vault
------------------------------*/
function readVault() {
  const raw = fs.readFileSync(VAULT_FILE);
  return JSON.parse(raw);
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
  const hash = crypto
    .createHash("sha256")
    .update(input)
    .digest("hex");

  return hash;
}

/* -----------------------------
   Add record to vault
------------------------------*/
function addRecord(user, data) {
  const vault = readVault();
  const hash = createHash(data);

  const entry = {
    user: user,
    hash: hash,
    createdAt: new Date().toISOString()
  };

  const already = vault.data.find(r => r.hash === hash);

  if (already) {
    console.log("Record already exists in vault");
    return;
  }

  vault.data.push(entry);
  saveVault(vault);

  console.log("New vault entry stored");
  console.log(entry);
}

/* -----------------------------
   Verify record
------------------------------*/
function verifyRecord(data) {
  const vault = readVault();
  const hash = createHash(data);

  const record = vault.data.find(r => r.hash === hash);

  if (record) {
    console.log("Record verified");
    console.log(record);
  } else {
    console.log("No matching record found");
  }
}

/* -----------------------------
   List vault records
------------------------------*/
function listRecords() {
  const vault = readVault();

  console.log("Vault Records:");
  vault.data.forEach((r, i) => {
    console.log(i + 1 + ".", r.user, "-", r.hash);
  });
}

/* -----------------------------
   Start script
------------------------------*/

initVault();

// test entries
addRecord("test1", "sample data 1");
addRecord("aman", "test file data");

// verify
verifyRecord("test file data");

// show vault records
listRecords();
// validate if hash exists in vault
function validateHash(hash) {
    return vault.includes(hash);
}
