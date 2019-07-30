var express = require('express');
var app = express();

const address = require('./config/address.js');
const abi = require('./config/abi');

var Web3 = require('web3');

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

var web3 = new Web3(Web3.currentProvider || 'ws://localhost:8545');

var auth = new web3.eth.Contract(abi, address);

app.get('/', function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    console.log("hello world");

    var web3 = new Web3(Web3.currentProvider || 'ws://192.168.8.106:7545');
    
    var auth = new web3.eth.Contract(ABI,Address);

    auth.once('LoginAttempt', {
        filter: { myIndexedParam: [20, 23], myOtherIndexedParam: '0x123456789...' }, // Using an array means OR: e.g. 20 or 23
        fromBlock: 0
    }, function(error, event) { console.log(event); });

    res.end('hello world');
    res.send();
    
})

var server = app.listen(8081, function() {
    const host = "127.0.0.1";
    const port = server.address().port;

    console.log("Device listening at http://%s:%s", host, port);

});
