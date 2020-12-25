var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var mongoose = require("mongoose");
const crypto = require("crypto");

// App config
mongoose.connect("mongodb://localhost/numberstation", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.listen(3000, function () {
  console.log("server is running");
});

// Schema config
var newUser = new mongoose.Schema({
  user_id: String,
  public_key: String,
  private_key: String,
  created: { type: Date, default: Date.now },
});
var User = mongoose.model("User", newUser);

var newMessage = new mongoose.Schema({
  body: String,
  user_id: String,
  users: [],
  created: { type: Date, default: Date.now },
});

var Message = mongoose.model("Message", newMessage);
//Blog.create({
//title: "test blog",
//	image: " https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg",
//	body: 'this is a test blog post!'
// })

//RESTful Routes

app.get("/", function (req, res) {
  Message.find({})
    .populate("users")
    .exec(function (err, foundMessage) {
      if (err) {
        console.log(err);
        res.redirect("back");
      } else {
        res.render("index", { mes: foundMessage.reverse() });
      }
    });
});

app.get("/new", function (req, res) {
  res.render("new", {});
});

app.get("/messages", function (req, res) {
  Message.find({})
    .populate("users")
    .exec(function (err, foundMessage) {
      if (err) {
        console.log(err);
        res.redirect("back");
      } else {
        res.render("messages", { mes: foundMessage.reverse() });
      }
    });
});

app.post("/messages", function (req, res) {
  Message.find({ user_id: req.body.user_id })
    .populate("users")
    .exec(function (err, foundMessage) {
      if (err) {
        console.log(err);
        res.redirect("back");
      } else {
        res.render("messages", { mes: foundMessage.reverse() });
      }
    });
});

app.post("/new", function (req, res) {
  let payload = {
    user_id: req.body.user_id,
  };

  User.create(payload, function (err, newUser) {
    if (err) {
      console.log(err);
      res.render("new");
    } else {
      const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
        modulusLength: 2048,
        publicKeyEncoding: {
          type: "pkcs1",
          format: "pem",
        },
        privateKeyEncoding: {
          type: "pkcs1",
          format: "pem",
        },
      });

      key = privateKey;
      keyBegin = "-----BEGIN RSA PRIVATE KEY-----";
      keyBeginLength = keyBegin.length;
      keyStart = key.slice(0, keyBeginLength);
      keyEnd = "-----END RSA PRIVATE KEY-----";
      keyEndIndex = key.search(keyEnd);
      keyFin = key.slice(keyEndIndex, keyEndIndex + keyEnd.length);
      keyMid = key.slice(keyBeginLength, keyEndIndex);
  

      newUser.public_key = publicKey;
      newUser.save();
      res.render("complete", {
        id: newUser.user_id,
        privateKey: keyMid,
        publicKey: publicKey,
      });
    }
  });
});

app.post("/messages/new", function (req, res) {
  User.findOne({ user_id: req.body.user_id }, function (err, foundUser) {
    if (err) {
      console.log(err);
      res.redirect("back");
    } else {
      console.log(foundUser);
      Message.create({}, function (err, message) {
        if (err) {
          console.log(err);
          res.redirect("back");
        } else {
          // This is the data we want to encrypt
          const data = req.body.mes;
          console.log(foundUser.public_key,)
          const encryptedData = crypto.publicEncrypt(
            {
              key:  Buffer.from(foundUser.public_key,"utf8"),
              padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
              oaepHash: "sha256",

              
            },
            Buffer.from(data)
          );
          message.body = encryptedData.toString("base64");
          message.user_id = req.body.user_id;
          message.save();

          res.redirect("back");
        }
      });
    }
  });
});

app.post("/decrypt", function (req, res) {
  Message.findById(req.body.id, function (err, foundMessage) {
    if (err) {
      console.log(err);
      res.redirect("back");
    } else {
      key = req.body.key;
  
      const keyNew =
        "-----BEGIN RSA PRIVATE KEY-----\n" +
        key +
        "\n-----END RSA PRIVATE KEY-----";

      const decryptedData = crypto.privateDecrypt(
        {
          key: Buffer.from(keyNew,"utf8"),
          padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
          oaepHash: "sha256",
        },
        Buffer.from(req.body.body,"base64")
      );
      console.log("decrypted data: ", decryptedData.toString());
      res.render("messages", {
        mes: [{ user_id: foundMessage.user_id, body: decryptedData.toString() }] ,
      });
    }


  });
});

app.get("/blogs", function (req, res) {
  Blog.find({}, function (err, blogs) {
    if (err) {
      console.log(err);
    } else {
      res.render("index", { blogs: blogs });
    }
  });
});

app.get("/blogs/new", function (req, res) {
  res.render("new");
});

app.get("/blogs/:id", function (req, res) {
  Blog.findById(req.params.id, function (err, foundBlog) {
    if (err) {
      req.redirect("/blogs");
    } else {
      res.render("show", { blog: foundBlog });
    }
  });
});

app.get("/blogs/:id/edit", function (req, res) {
  Blog.findById(req.params.id, function (err, foundBlog) {
    if (err) {
      req.redirect("/blogs");
    } else {
      res.render("edit", { blog: foundBlog });
    }
  });
});

app.put("/blogs/:id", function (req, res) {
  req.body.blog.body = req.sanitize(req.body.blog.body);

  Blog.findByIdAndUpdate(
    req.params.id,
    req.body.blog,
    function (err, updatedBlog) {
      if (err) {
        res.redirect("/blogs");
      } else {
        res.redirect("/blogs/" + req.params.id);
      }
    }
  );
});

app.delete("/blogs/:id", function (req, res) {
  Blog.findByIdAndRemove(
    req.params.id,
    req.body.blog,
    function (err, updatedBlog) {
      if (err) {
        res.redirect("/blogs");
      } else {
        res.redirect("/blogs");
      }
    }
  );
});
