var connect = require("connect");

var app = connect();

app.use(connect.static(__dirname + "/dist"));

app.listen(9002);
console.log("Server running on port 8567");
