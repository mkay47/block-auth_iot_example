module.exports = [{
        "anonymous": false,
        "inputs": [{
                "indexed": false,
                "name": "sender",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "token",
                "type": "bytes32"
            }
        ],
        "name": "LoginAttempt",
        "type": "event"
    },
    {
        "constant": false,
        "inputs": [],
        "name": "rand",
        "outputs": [{
            "name": "",
            "type": "bytes32"
        }],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [],
        "name": "login_admin",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    }
];