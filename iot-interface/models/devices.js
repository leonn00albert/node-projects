var mongoose = require('mongoose');
// Schema config
var deviceSchema = new mongoose.Schema({
    user: String,
    mac: String,
    ip:String,
    token: String,
    data : String,
    device : String,
    protocol: String,
    port: String,
	created: {type: Date, default: Date.now}
});

module.exports = mongoose.model("device", deviceSchema);