var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var urlencodedParser = bodyParser.urlencoded({ extended: false });

var address = require('./config/address.js');
var abi = require('./config/abi');

var Web3 = require('web3');

//var web3 = new Web3(Web3.providers.WebsocketProvider('ws://192.168.8.106:8545'));
var web3 = new Web3(Web3.currentProvider || 'ws://192.168.8.106:8545');

var auth = new web3.eth.Contract(abi, address);

var token = '';
var sender = '';
var message = '';
var event_happened = false;

auth.once('LoginAttempt', {
    filter: { myIndexedParam: [20, 23], myOtherIndexedParam: '0x123456789...' }, // Using an array means OR: e.g. 20 or 23
    fromBlock: 0
}, function(error, event) {
    if (!error) {
        event_happened = true;
        sender = event.returnValues.sender;
        token = event.returnValues.token;
        console.log("\x1b[42m", "[+] Authentication Event Arrived");
        console.log("\x1b[0m", "\n");
    }
});

app.use(bodyParser.json());

app.get('/', function(req, res) {
    res.setHeader('Content-Type', 'application/json');

    console.log('Connected Client: ' + req.socket.remoteAddress + ":" + req.socket.remotePort);
    console.log('welcome to iot device');

    res.end(JSON.stringify({ message: 'welcome to iot device' }, null, 4));
    res.send();

});

app.post('/auth_data', urlencodedParser, function(req, res) {
    res.setHeader('Content-Type', 'application/json');

    console.log('Connected Client: ' + req.socket.remoteAddress + ":" + req.socket.remotePort);

    if (event_happened) {
        // console.log('sender', sender);
        // console.log('token', token);
        res.end(JSON.stringify({ sender: sender, token: token }, null, 4));
        res.send();
    } else {
        // console.log('welcome to iot device');
        console.log("\x1b[31m", "[+] Event Not Triggered .. Access Denied");
        console.log("\x1b[0m", "\n");
        res.end(JSON.stringify({ message: 'Access Denied' }, null, 4));
        res.send();
    }
});

app.post('/connect', urlencodedParser, function(req, res) {
    res.setHeader('Content-Type', 'application/json');

    console.log('Connected Client: ' + req.socket.remoteAddress + ":" + req.socket.remotePort);

    message = req.body.message.split(',');
    console.log('message', message[0]);

    if (token == message[0]) {
        console.log("\x1b[42m", "[+] User Validated .. Access Granted");
        console.log("\x1b[0m", "\n");
        res.end(JSON.stringify({ message: 'Access Granted' }, null, 4));
        res.send();
    } else {
        console.log("\x1b[31m", "[+] Invalid Token .. Access Denied");
        console.log("\x1b[0m", "\n");
        res.end(JSON.stringify({ message: 'Access Denied' }, null, 4));
        res.send();
    }

});

var server = app.listen(8081, function() {
    var host = "192.168.8.186";
    var port = server.address().port;

    console.log("Device listening at http://%s:%s", host, port);
});
