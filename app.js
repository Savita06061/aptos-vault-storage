const fs = require("fs");

let vault = {
 data:[
  {user:"test1",hash:"0x34ab9"},
  {user:"test2",hash:"0x98ff2"}
 ]
};

function storeRecord(user,hash){
 vault.data.push({user,hash});
 fs.writeFileSync("vault.json",JSON.stringify(vault,null,2));
 console.log("Record stored in vault");
}

storeRecord("demoUser","0xabcdef");
// --- Vault record simulation update ---

function addVaultEntry(user,data){
 const entry = {
  user:user,
  hash:generateHash(data),
  time:new Date().toISOString()
 }

 console.log("Vault entry created:",entry)
}

function generateHash(data){
 let hash=0;
 for(let i=0;i<data.length;i++){
  hash=((hash<<5)-hash)+data.charCodeAt(i)
  hash|=0;
 }
 return "vault_"+Math.abs(hash)
}

// test entry
addVaultEntry("aman","test file data")
