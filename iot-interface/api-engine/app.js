// Packages 
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var methodOverride =require('method-override')
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
const { urlencoded } = require('body-parser');
var Device = require("../models/devices")
var user = "leon";
var pwd = "iotAdmin64"
var auth = false;


// App config
mongoose.connect('mongodb://localhost/iot_app',  { useNewUrlParser: true, useUnifiedTopology: true });
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride("_method"));


app.listen(3000,function(){
	console.log("server is running")
})


// Schema config
var userSchema = new mongoose.Schema({
	user: String,
	token: String,
	created: {type: Date, default: Date.now}
});

var User = mongoose.model("user", userSchema);



//routes
app.get("/", function(req, res){
    if(auth == true){
        User.find({},function(err,foundUsers){
            if(err){
                console.log(err);
            }
            else{
                res.render("index",{users: foundUsers})
            }
        })
    }
    else{
        res.redirect("/login")
    }

})

app.get("/login", function(req, res){
	res.render("login")
})


app.post("/login", function(req, res){
    if(req.body.user == user && req.body.pwd == pwd){
        auth = true;
        res.redirect("/")
    }
    else{
        res.redirect("/login")
    }
    
} )

//routes
app.get("/users", function(req, res,checkIfAuth){
    if(auth){
        User.find({},function(err,foundUsers){
            if(err){
                console.log(err);
            }
            else{
                res.render("users/index",{users: foundUsers})
            }
        })
    }
    else{
        res.redirect("/login")
    }

})
app.get("/users/new",function(req, res,checkIfAuth){
    res.render("users/new")
})

app.post("/users/new",function(req, res,checkIfAuth){
    var token = jwt.sign({ user: req.body.user }, 'randomSentence');

    let body = {
        user : req.body.user,
        token :  token
    }
    User.create(body, function(err,createdUser){
        res.redirect("/users")
    })
})


app.delete("/users",function(req, res,checkIfAuth){

    User.findByIdAndDelete(req.body.id,function(err,r){
        if(err){
            console.log(err)
        }else{
            res.redirect("back")
        }
    })
})



app.get("/devices", function(req, res,checkIfAuth){
    if(auth){
        Device.find({},function(err,foundDevices){
            if(err){
                console.log(err);
            }
            else{
                res.render("devices/index",{devices: foundDevices})
            }
        })
    }
    else{
        res.redirect("/login")
    }

})

app.get("/devices/new",function(req, res,checkIfAuth){
    res.render("devices/new")
})

app.post("/devices/new",function(req, res,checkIfAuth){
    var token = jwt.sign({ user: req.body.user }, 'randomSentence');
    let body = {
        ip: req.body.ip,
        mac: req.body.mac,
        device: req.body.device,
        data: req.body.data,
        protocol: req.body.protocol,
        port: req.body.port,
        user : req.body.user,
        token :  token
    }
    Device.create(body, function(err,createdUser){
        res.redirect("/devices")
    })
})

app.get("/devices/:id/update",function(req, res,checkIfAuth){
    Device.findById(req.params.id,function(err, foundDevice){
        if(err){
            console.log(err);
        }else{
            res.render("devices/update",{device:foundDevice})
        }
    })
})


app.put("/devices/:id",function(req, res,checkIfAuth){
    let body = {
        ip: req.body.ip,
        mac: req.body.mac,
        device: req.body.device,
        data: req.body.data,
        protocol: req.body.protocol,
        port: req.body.port,
        user : req.body.user,
    }
    Device.findByIdAndUpdate(req.params.id,body,function(err,r){
        if(err){
            console.log(err)
        }else{
            res.redirect("back")
        }
    })
})


app.delete("/devices",function(req, res,checkIfAuth){
    Device.findByIdAndDelete(req.body.id,function(err,r){
        if(err){
            console.log(err)
        }else{
            res.redirect("back")
        }
    })
})





function checkIfAuth(req,res,next){
    if(auth === true){
        next()
    }
    else{
        res.redirect("/login")
    }
}