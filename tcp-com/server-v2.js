const crypto = require("crypto");

const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
  modulusLength: 2048,
  publicKeyEncoding: {
    type: "pkcs1",
    format: "pem",
  },
  privateKeyEncoding: {
    type: "pkcs1",
    format: "pem",
  },
});



var net = require("net");
(PassThroughStream = require("stream").PassThrough),
  (stream = new PassThroughStream());
net
  .createServer({ allowHalfOpen: true }, function (socket) {
    socket.end("Hello, this is TCP\n");
    socket.pipe(stream, { end: false });
  })
  .listen(8080);
net
  .createServer(function (socket) {
    stream.on("data", function (d) {
      if(d.toString() == "get"){
        socket.write(publicKey)
      }
      else{
        setTimeout(() => {
          const decryptedData = crypto.privateDecrypt(
            {
              key: privateKey,
              padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
              oaepHash: "sha256",
            },

            Buffer.from(d.toString(),'base64')
          );
          socket.write(decryptedData.toString())
  
        }, 1000);
      }
 
     
    });
    socket.pipe(stream);
  })
  .listen(8081);
