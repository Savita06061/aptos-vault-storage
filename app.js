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
