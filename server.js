const express = require('express');
const app = express();
const parser = require('accept-language-parser');

app.get('/', function (req, res) {
  var languages = parser.parse(req.headers['accept-language']).toAgent();

  res.send(JSON.stringify({
    ipaddress: req.headers['x-forwarded-for'],
    language: languages[0]["code"] + '-' + languages[0]["region"],
    //need more work
    software: req.headers['user-agent']
  }))
})

app.listen(8080, function () {
  console.log('Example app listening on port 8080!')
})