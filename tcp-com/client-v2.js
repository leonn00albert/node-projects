
var net = require("net");
const crypto = require("crypto");
const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


rl.question("Message to be send:  ", function(message) {
  setTimeout(() => {
    var client = net
      .connect(8081, "localhost", function () {
   
        process.stdin.pipe(client);
        client.write("get");
      })
      .on("data", function (data) {
  
        if(data.toString().includes("-----BEGIN RSA PUBLIC KEY-----")){
          const encryptedData = crypto.publicEncrypt(
            {
              key: data,
              padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
              oaepHash: "sha256",
            },
            Buffer.from(message)
          );
          console.log("encrypted message: " + encryptedData.toString("base64"))

          client.write(encryptedData.toString("base64"))
        }
        else{
          console.log("decrypted Message: " + data.toString())
        }
     
      })
      .on("end", function () {
        console.log("session ended");
      });
  }, 1000);
  
});

rl.on("close", function() {
    console.log("======= Closed TCP CRYPTO Terminal ========");
    process.exit(0);
});
