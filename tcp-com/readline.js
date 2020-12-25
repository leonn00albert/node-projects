const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("Message to be send:  ", function(message) {
    console.log(message)
});

rl.on("close", function() {
    console.log("=======Closed TCP CRYPTO Terminal========");
    process.exit(0);
});