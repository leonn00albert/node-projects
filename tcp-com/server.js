var net = require("net");
var CryptoJS = require("crypto-js");
require("dotenv").config();

const secretKey = process.env.SECRET_KEY;

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
      var decrypted = CryptoJS.AES.decrypt(d.toString(), secretKey);
      setTimeout(() => {
        socket.write(decrypted.toString(CryptoJS.enc.Utf8));
      }, 1000);
    });
    socket.pipe(stream);
  })
  .listen(8081);
