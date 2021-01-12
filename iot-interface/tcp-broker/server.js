var net = require("net");
const http = require('http')
var mongoose = require('mongoose');
const { stringify } = require("querystring");
mongoose.connect('mongodb://localhost/iot_app',  { useNewUrlParser: true, useUnifiedTopology: true });


// Schema config
var dataSchema = new mongoose.Schema({
  temp: String,
  hum: String,
	created: {type: Date, default: Date.now}
});

var Data = mongoose.model("data", dataSchema);

net
  .createServer({ allowHalfOpen: true }, function (socket) {
    socket.on("data",(d)=>{
      let str = d.toString();
      let arr = str.split(",")



    
        Data.create({temp: arr[0],hum : arr[1] }).then(console.log("send data")).catch((error) => {
          console.log(error);
        })
      



    })
  })
  .listen(8080);
