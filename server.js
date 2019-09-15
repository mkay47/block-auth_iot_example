var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var urlencodedParser = bodyParser.urlencoded({ extended: false });

var address = require('./config/address.js');
var abi = require('./config/abi');

var Web3 = require('web3');

var Gpio = require('onoff').Gpio; //include onoff to interact with the GPIO

var bedroomLED = new Gpio(12, 'out'); //use GPIO pin 4, and specify that it is output
var kitchenLED = new Gpio(21, 'out'); //use GPIO pin 4, and specify that it is output

//var web3 = new Web3(Web3.providers.WebsocketProvider('ws://192.168.8.106:8545'));
var web3 = new Web3(Web3.currentProvider || 'ws://192.168.8.106:8545');

var auth = new web3.eth.Contract(abi, address);

var token = '';
var sender = '';
var ip = '192.168.8.186:8081';
var message = '';
var signature ='';
var event_happened = false;

auth.once('DistributeToken', {
    filter: { myIndexedParam: [20, 23], myOtherIndexedParam: '0x123456789...' }, // Using an array means OR: e.g. 20 or 23
    fromBlock: 0
}, function(error, event) {
    if (!error) {
        event_happened = true;
        sender = event.returnValues.user.toLowerCase();
        console.log('event sender',sender);
        ip = event.returnValues.ip;
        console.log('event ip', ip);
        token = event.returnValues.token;
        console.log(token);
        console.log("\x1b[42m", "[+] Authentication Event Arrived");
        console.log("\x1b[0m", "\n");
    }else{
        console.log("\x1b[31m", "[+] Error occured while distributing token");
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
        res.end(JSON.stringify({ sender: sender, token: token, ip: ip }, null, 4));
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
    console.log('message', message);
    console.log('message token', message[0]);
    console.log('message ip', message[1]);
    console.log('message sender', message[2]);
    
    console.log('sender r', sender);
    
    if (token == message[0] ) {
        if(ip == message[1]){
            if(sender == message[2].toLowerCase()){
                console.log("\x1b[42m", "[+] User Validated .. Access Granted");
                console.log("\x1b[0m", "\n");
                res.end(JSON.stringify({ message: 'Access Granted' }, null, 4));
                res.send();
            }else{
                console.log("\x1b[31m", "[+] Invalid Sender Address .. Access Denied");
                console.log("\x1b[0m", "\n");
                res.end(JSON.stringify({ message: 'Access Denied' }, null, 4));
                res.send();
            }
        }else{
            console.log("\x1b[31m", "[+] Invalid IP Address .. Access Denied");
            console.log("\x1b[0m", "\n");
            res.end(JSON.stringify({ message: 'Access Denied' }, null, 4));
            res.send();
        }
        
    } else {
        console.log("\x1b[31m", "[+] Invalid Token .. Access Denied");
        console.log("\x1b[0m", "\n");
        res.end(JSON.stringify({ message: 'Access Denied' }, null, 4));
        res.send();
    }

});

app.post('/lights/on', function(req, res) {
    kitchenLED.writeSync(1); //set pin state to 1 (turn LED on)
    bedroomLED.writeSync(1); //set pin state to 1 (turn LED on)
    res.end(JSON.stringify({ message: 'lights turned on' }, null, 4));
    res.send();

});

app.post('/lights/off', function(req, res) {
    kitchenLED.writeSync(0); //set pin state to 0 (turn LED off)
    bedroomLED.writeSync(0); //set pin state to 0 (turn LED off)
    res.end(JSON.stringify({ message: 'lights turned off' }, null, 4));
    res.send();

});

var server = app.listen(8081, function() {
    var host = "192.168.8.186";
    var port = server.address().port;

    console.log("Device listening at http://%s:%s", host, port);
});
