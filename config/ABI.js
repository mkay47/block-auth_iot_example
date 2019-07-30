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
      "type": "function"
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
          "name": "token",
          "type": "bytes32"
        }
      ],
      "name": "LoggedIn",
      "type": "event"
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
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [],
      "name": "Login",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ];
