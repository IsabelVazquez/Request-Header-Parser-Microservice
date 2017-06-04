const express = require('express');
const app = express();
var port = process.env.PORT;
const parser = require('accept-language-parser');
var useragent = require('useragent');

app.get('/', function (req, res) {
  var languages = parser.parse(req.headers['accept-language']);
  var agent = useragent.parse(req.headers['user-agent']);
  var version = agent.os.toVersion();
  
  res.send(JSON.stringify({
    ipaddress: req.headers['x-forwarded-for'],
    language: languages[0]["code"] + '-' + languages[0]["region"],
    software: agent['os']['family'] + ' ' + version
  }))
})

app.listen(port);
console.log("Server is listening on port " + port);
