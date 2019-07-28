module.exports = [
    {
      "constant": true,
      "inputs": [],
      "name": "hash",
      "outputs": [
        {
          "name": "",
          "type": "bytes32"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function",
      "signature": "0x09bd5a60"
    },
    {
      "inputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "constructor",
      "signature": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "name": "username",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "password",
          "type": "bytes32"
        }
      ],
      "name": "LoggedIn",
      "type": "event",
      "signature": "0x41aef8183964a2812ac89ffb7a998d625983a19b88633aca08d09afe9acdadbe"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "name": "_receiver",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "message",
          "type": "string"
        }
      ],
      "name": "Message",
      "type": "event",
      "signature": "0x811f7cff0a3374ff67cccc3726035d34ba70410e0256818a891e4d6acc01d88e"
    },
    {
      "constant": false,
      "inputs": [],
      "name": "rand",
      "outputs": [
        {
          "name": "",
          "type": "bytes32"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function",
      "signature": "0x3b3dca76"
    },
    {
      "constant": false,
      "inputs": [],
      "name": "Login",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function",
      "signature": "0xf00ac1da"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "account",
          "type": "address"
        },
        {
          "name": "message",
          "type": "string"
        }
      ],
      "name": "SendToken",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function",
      "signature": "0xcc867dfd"
    }
  ];