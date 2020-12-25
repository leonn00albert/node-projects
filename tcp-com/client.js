var CryptoJS = require("crypto-js");
var net = require("net");
require("dotenv").config();

const secretKey = process.env.SECRET_KEY;

const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("Message to be send:  ", function(message) {
  var encrypt = CryptoJS.AES.encrypt(message, secretKey);
  var mes = encrypt.toString();
  console.log("Encrypted version: " + mes);
  setTimeout(() => {
    var client = net
      .connect(8081, "localhost", function () {
   
        process.stdin.pipe(client);
        client.write(mes);
      })
      .on("data", function (data) {
        console.log(data + "");
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
