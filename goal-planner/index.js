// Packages 
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var methodOverride =require('method-override')
var mongoose = require('mongoose');
const server = require('http').createServer(app);
const io = require('socket.io')(server);

// App config
mongoose.connect('mongodb://localhost/blogapp',  { useNewUrlParser: true, useUnifiedTopology: true });
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride("_method"));


app.listen(80,function(){
	console.log("server is running")
})




// Schema config
var newSchema = new mongoose.Schema({
	title: String,
	image: String,
	body: String,
	created: {type: Date, default: Date.now}
});

var newModel = mongoose.model("name", newSchema);


//routes
app.get("/", function(req, res){
	res.render("home")
})

app.get("/update", function(req, res){
	console.log("hello")
	console.log(req.body)
})
io.on('connection', () => { 
	socket.on('light', function(data) { //get light switch status from client
		console.log('hello')
	  });
	
});
