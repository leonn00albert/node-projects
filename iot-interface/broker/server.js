const aedes = require('aedes')()
const server = require('net').createServer(aedes.handle)
const port = 1883
const mongoose = require("mongoose");
const Device = require("../models/devices")
mongoose.connect('mongodb://localhost/iot_app',  { useNewUrlParser: true, useUnifiedTopology: true });

server.listen(port, function () {
  aedes.authenticate = function (client, mac,password, cb) {
    console.log(mac)
    Device.findOne({"mac": mac },function(err, foundDevice){
      if(err){
        console.log(err);
      }else{

        if(foundDevice != null){
          cb(null, true);
        } 
        else{

        }
      }
    })
  
  }

  aedes.addListener("publish",function(event){
    console.log(event.payload.toString())
  })
  console.log('server started and listening on port ', port)

})