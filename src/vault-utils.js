function generateHash(data){
 let hash=0

 for(let i=0;i<data.length;i++){
  hash=((hash<<5)-hash)+data.charCodeAt(i)
  hash|=0
 }

 return "vault_"+Math.abs(hash)
}

module.exports=generateHash
