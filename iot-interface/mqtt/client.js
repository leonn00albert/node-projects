// Packages 
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var methodOverride =require('method-override')
var mongoose = require('mongoose');

// App config
mongoose.connect('mongodb://localhost/mqtt',  { useNewUrlParser: true, useUnifiedTopology: true });
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride("_method"));


app.listen(3000,function(){
	console.log("server is running")
})


// Schema config
var newSchema = new mongoose.Schema({
	title: String,
	data: String,
	body: String,
	created: {type: Date, default: Date.now}
});

var newModel = mongoose.model("data", newSchema);


//routes
app.get("/", function(req, res){
	res.render("")
})


var mqtt = require('mqtt')
const readline = require("readline");

var options = {
    clientId: 'mqttjs_' + Math.random().toString(16).substr(2, 8),
    username: "leon",
  };
var client  = mqtt.connect('mqtt://127.0.0.1:1883',options,{

})


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

client.on('connect', function () {
    console.log(client)
    client.subscribe('presence', function (err) {

    })
  })
 
client.on('message', function (topic, message) {
    package = {
        data: message.toString(),
    }
    newModel.create(package,function(err,complete){
        if(err){
            console.log(err);
        }else{
            console.log(message.toString())
        }
    })
  })