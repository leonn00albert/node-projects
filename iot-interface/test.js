var macaddress = require('macaddress');
var mqtt = require('mqtt')


macaddress.one(function (err, mac) {
  var options = {
    clientId: 'mqttjs_' + Math.random().toString(16).substr(2, 8),
    username: mac,
  };
  var client  = mqtt.connect('mqtt://127.0.0.1:1883',options,{
  })
  
  
  client.on('connect', function () {
    console.log(client)
    client.subscribe('presence', function (err) {
    })
  })

});