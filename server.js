var express = require('express');
var app = express();

var address = require('./config/address.js');
var abi = require('./config/abi');

var Web3 = require('web3');

var web3 = new Web3(Web3.providers.WebsocketProvider('ws://0.0.0.0:8545'));
//var web3 = new Web3(Web3.currentProvider || 'ws://192.168.8.106:8545');
//var web3 = new Web3(new Web3.providers.HttpProvider('http://192.168.8.106:8545'));

var auth = new web3.eth.Contract(abi, address);

var token = '';
var sender = '';
var event_happened = false;

auth.once('LoginAttempt', {
    filter: { myIndexedParam: [20, 23], myOtherIndexedParam: '0x123456789...' }, // Using an array means OR: e.g. 20 or 23
    fromBlock: 0
}, function(error, event) {
    if (!error) {
        event_happened = true;
        sender = event.returnValues.sender;
        token = event.returnValues.token;
        console.log("sender", sender);
        console.log("token", token);
    }


});

app.get('/', function(req, res) {
    res.setHeader('Content-Type', 'application/json');

    if (event_happened) {
        console.log('sender', sender);
        res.end('sender: ' + sender);
        res.send();
    } else {
        console.log('hello world');
        res.end('hello world');
        res.send();
    }

});

app.post('auth_data', function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    console.log("hello world");

    auth.once('LoginAttempt', {
        filter: { myIndexedParam: [20, 23], myOtherIndexedParam: '0x123456789...' }, // Using an array means OR: e.g. 20 or 23
        fromBlock: 0
    }, function(error, event) {
        var sender = event.returnValues.sender;
        var token = event.returnValues.token;

        console.log("sender", sender);
        console.log("token", token);

        res.end('sender: ' + sender);
        res.send();
    });

    res.end('hello world');
    res.send();
});

var server = app.listen(8081, function() {
    var host = "127.0.0.1";
    var port = server.address().port;

    console.log("Device listening at http://%s:%s", host, port);
});