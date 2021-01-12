const http = require('http');
const url = require('url');

http.createServer(function(r, s) {
    const queryObject = url.parse(r.url,true).query;
    console.log(queryObject);
    var body = "";
    r.on('readable', function() {
        body += r.read();
    });
    r.on('end', function() {
        s.end(); 
    });
}).listen(3000);