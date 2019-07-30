var express = require('express');
var app = express();

var address = require('./config/address.js');
var abi = require('./config/abi');

var Web3 = require('web3');

//var web3 = new Web3(Web3.providers.WebsocketProvider('ws://192.168.8.106:8545'));
var web3 = new Web3(Web3.currentProvider || 'ws://192.168.8.106:8545');
//var web3 = new Web3(new Web3.providers.HttpProvider('http://192.168.8.106:8545'));

var auth = new web3.eth.Contract(abi, address);

app.get('/', function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    console.log("hello world");

    auth.once('LoginAttempt', {
        filter: { myIndexedParam: [20, 23], myOtherIndexedParam: '0x123456789...' }, // Using an array means OR: e.g. 20 or 23
        fromBlock: 0
    }, function(error, event) { console.log(event); });

    res.end('hello world');
    res.send();

});

var server = app.listen(8081, function() {
    var host = "127.0.0.1";
    var port = server.address().port;

    console.log("Device listening at http://%s:%s", host, port);
});
