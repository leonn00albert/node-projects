var mongoose = require('mongoose');
// Schema config
var dataSchema = new mongoose.Schema({
    source: String,
    content : String,
	created: {type: Date, default: Date.now}
});

module.exports = mongoose.model("data", dataSchema);