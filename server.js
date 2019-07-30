var express = require('express');
var app = express();
var bodyParser = require('body-parser');

// Create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

const Address = require('./config/Address.js');
const ABI = require('./config/ABI.js');
var Web3 = require('web3');
var message = "";

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

// This responds with "Hello World" on the homepage
app.post('/auth_data',urlencodedParser, function (req, res) {
    
    host =  req.socket.remoteAddress;
    port = req.socket.remotePort;
    res.setHeader('Content-Type', 'application/json');
    
    console.log('CONNECTED Client');
    console.log("HOST",host);
    console.log("PORT",port);
    
    message = req.body.message;
    publicKey = req.body.public_key;

    result = message.split(",");

    console.log("TOKEN",result[0]);
    console.log("IP",result[1]);
    console.log("TIME",result[2]);
    console.log("KEY",result[3]);

    var web3 = new Web3(Web3.currentProvider || 'ws://192.168.8.106:7545');
    
    var auth = new web3.eth.Contract(ABI,Address);

    auth.once('LoggedIn', {
        filter: {myIndexedParam: [20,23], myOtherIndexedParam: '0x123456789...'}, // Using an array means OR: e.g. 20 or 23
        fromBlock: 0
    }, function(error, event)
    {
        if(!error){
            //console.log("event",event); 
            sender = event.returnValues.username;
            token = event.returnValues.password;

            console.log("\x1b[42m","[+] Authentication Event Arrived")
            console.log("\x1b[0m","\n");

            console.log("token",token);
            console.log("sender",sender);

            if(token == result[0])
            {
                console.log("\x1b[42m","[+] User Validated .. Access Granted");
                console.log("\x1b[0m","\n");
                res.end('{ "message": "Access Granted" }');
                res.send()
            }else{
                console.log("\x1b[41m","[+] Invalid User .. Access Denied");
			    console.log("\x1b[0m","\n");
                res.end('{ "message": "Access Granted" }');
                res.send()
            }
        }
    });

    console.log("message",message);
    console.log("key",publicKey);

    res.end('{ "message": "Welcome to iot device server" }');
    res.send()
    
})

app.get('/', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ message: "Welcome to iot device server" }));
    res.send();
    
 })

var server = app.listen(8081, function () {
    var host = "192.168.8.186"//server.address().address
    var port = server.address().port
    
    console.log("Device listening at http://%s:%s", host, port);
 })
