const aedes = require('aedes')()
const server = require('net').createServer(aedes.handle)
const port = 1883

server.listen(port, function () {
  aedes.authenticate = function (client, username,password, cb) {
    if( username === 'leon'){
      cb(null, true,function(){console.log("user is authenticated!")});
    }
  }
  console.log('server started and listening on port ', port)

})