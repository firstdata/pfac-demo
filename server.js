const express = require('express');
const bodyParser = require('body-parser')
const app = express();
let request = require('request');
var crypto = require('crypto');

// load web app
app.use('/src', express.static(__dirname + '/src'));

//app.use(express.static(path.join(__dirname, 'build')));

app.use(express.static('src'));
app.use(bodyParser());

//var kongUrl = "https://developer.firstdata.com/api";

const fs = require('fs');

let rawdata = fs.readFileSync('credentials.json');
let credentials = JSON.parse(rawdata)['dev'];

// Set the headers
var getAuthenticationHeaders = function () {
    var date = new Date().toUTCString();
    var stringToSign = 'date: ' + date.trim();
    var encodedSignature = crypto.createHmac("sha1", credentials.secret).update(stringToSign).digest("base64");
    var hmacAuth = 'hmac username="' + credentials.username + '",algorithm="hmac-sha1",headers="date",signature="' + encodedSignature + '"';
    return {
      'date': date,
      'Authorization': hmacAuth
    }
}

app.all('/marketplace/*', function(req, res) {
    var options = {
        method: req.method,
        url: credentials.kongUrl + req.originalUrl,
        headers: getAuthenticationHeaders()
      };
    if (req.method == 'POST') {
    options['json'] = req.body;
    options['content-type'] = 'application/json';
    }

    request(options, function(error, response, body) {
        debugger;
    if (error) throw new Error(error);
    res.status(response.statusCode).send(body);
    });
});

app.listen(process.env.PORT || 8080);