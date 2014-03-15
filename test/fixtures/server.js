var http = require("http"),
    path = require("path");

var connect = require("connect");

var app, server;

module.exports = {
  start: function (done) {
    app = connect().use(connect.static(__dirname));
    server = http.createServer(app);
    server.listen(3000, done);
  },
  stop: function (done) {
    server.close(done);
  }
};
