var http = require('http');

http.createServer(function (req, res) {
  res.write("music bot by b14ucky");
  res.end();
}).listen(8080);