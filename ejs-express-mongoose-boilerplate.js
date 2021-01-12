// Packages 
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var methodOverride =require('method-override')
var mongoose = require('mongoose');

// App config
mongoose.connect('mongodb://localhost/blogapp',  { useNewUrlParser: true, useUnifiedTopology: true });
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(expressSanitizer());
app.use(methodOverride("_method"));


app.listen(3000,function(){
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
	res.render("")
})
