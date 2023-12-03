
const ABIWojak = [{"inputs":[{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"symbol","type":"string"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"}];

const ABILiquidityController = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "previousOwner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "OwnershipTransferred",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "TokenA",
    "outputs": [
      {
        "internalType": "contract IERC20",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "TokenB",
    "outputs": [
      {
        "internalType": "contract IERC20",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "collectAllFees",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "amount0",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "amount1",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      },
      {
        "internalType": "uint128",
        "name": "_liquidity",
        "type": "uint128"
      },
      {
        "internalType": "uint256",
        "name": "_amount0Min",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_amount1Min",
        "type": "uint256"
      }
    ],
    "name": "decreaseLiquidity",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "amount0",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "amount1",
        "type": "uint256"
      }
    ],
    "name": "fundContract",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      }
    ],
    "name": "getAllTokenIds",
    "outputs": [
      {
        "internalType": "uint256[]",
        "name": "",
        "type": "uint256[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "amountAdd0",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "amountAdd1",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_amount0Min",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_amount1Min",
        "type": "uint256"
      }
    ],
    "name": "increaseLiquidityCurrentRange",
    "outputs": [
      {
        "internalType": "uint128",
        "name": "liquidity",
        "type": "uint128"
      },
      {
        "internalType": "uint256",
        "name": "amount0",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "amount1",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256[]",
        "name": "tokenIds",
        "type": "uint256[]"
      },
      {
        "internalType": "uint128[]",
        "name": "_liquidity",
        "type": "uint128[]"
      },
      {
        "internalType": "uint256[]",
        "name": "_amount0Min",
        "type": "uint256[]"
      },
      {
        "internalType": "uint256[]",
        "name": "_amount1Min",
        "type": "uint256[]"
      }
    ],
    "name": "loopDecrease",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256[]",
        "name": "tokenIds",
        "type": "uint256[]"
      },
      {
        "internalType": "uint256[]",
        "name": "amountAdd0",
        "type": "uint256[]"
      },
      {
        "internalType": "uint256[]",
        "name": "amountAdd1",
        "type": "uint256[]"
      },
      {
        "internalType": "uint256[]",
        "name": "_amount0Min",
        "type": "uint256[]"
      },
      {
        "internalType": "uint256[]",
        "name": "_amount1Min",
        "type": "uint256[]"
      }
    ],
    "name": "loopIncrease",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "int24",
        "name": "_lowerTick",
        "type": "int24"
      },
      {
        "internalType": "int24",
        "name": "_upperTick",
        "type": "int24"
      },
      {
        "internalType": "uint256",
        "name": "_amount0",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_amount1",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_amount0Min",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_amount1Min",
        "type": "uint256"
      }
    ],
    "name": "mintNewPosition",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      },
      {
        "internalType": "uint128",
        "name": "liquidity",
        "type": "uint128"
      },
      {
        "internalType": "uint256",
        "name": "amount0",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "amount1",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "nonfungiblePositionManager",
    "outputs": [
      {
        "internalType": "contract INonfungiblePositionManager",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "poolFee",
    "outputs": [
      {
        "internalType": "uint24",
        "name": "",
        "type": "uint24"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "positionsNFT",
    "outputs": [
      {
        "internalType": "contract IERC721Enumerable",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "renounceOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "retrieveNFT",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "transferOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "withdraw",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
]

const ABIINonfungiblePositionManager = [
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "approve",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "safeTransferFrom",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "components": [
            {
              "internalType": "address",
              "name": "token0",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "token1",
              "type": "address"
            },
            {
              "internalType": "uint24",
              "name": "fee",
              "type": "uint24"
            },
            {
              "internalType": "int24",
              "name": "tickLower",
              "type": "int24"
            },
            {
              "internalType": "int24",
              "name": "tickUpper",
              "type": "int24"
            },
            {
              "internalType": "uint256",
              "name": "amount0Desired",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "amount1Desired",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "amount0Min",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "amount1Min",
              "type": "uint256"
            },
            {
              "internalType": "address",
              "name": "recipient",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "deadline",
              "type": "uint256"
            }
          ],
          "internalType": "struct INonfungiblePositionManager.MintParams",
          "name": "params",
          "type": "tuple"
        }
      ],
      "name": "mint",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        },
        {
          "internalType": "uint128",
          "name": "liquidity",
          "type": "uint128"
        },
        {
          "internalType": "uint256",
          "name": "amount0",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "amount1",
          "type": "uint256"
        }
      ],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "positions",
      "outputs": [
        {
          "internalType": "uint96",
          "name": "nonce",
          "type": "uint96"
        },
        {
          "internalType": "address",
          "name": "operator",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "token0",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "token1",
          "type": "address"
        },
        {
          "internalType": "uint24",
          "name": "fee",
          "type": "uint24"
        },
        {
          "internalType": "int24",
          "name": "tickLower",
          "type": "int24"
        },
        {
          "internalType": "int24",
          "name": "tickUpper",
          "type": "int24"
        },
        {
          "internalType": "uint128",
          "name": "liquidity",
          "type": "uint128"
        },
        {
          "internalType": "uint256",
          "name": "feeGrowthInside0LastX128",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "feeGrowthInside1LastX128",
          "type": "uint256"
        },
        {
          "internalType": "uint128",
          "name": "tokensOwed0",
          "type": "uint128"
        },
        {
          "internalType": "uint128",
          "name": "tokensOwed1",
          "type": "uint128"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "amount0Desired",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "amount1Desired",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "amount0Min",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "amount1Min",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "deadline",
              "type": "uint256"
            }
          ],
          "internalType": "struct INonfungiblePositionManager.IncreaseLiquidityParams",
          "name": "params",
          "type": "tuple"
        }
      ],
      "name": "increaseLiquidity",
      "outputs": [
        {
          "internalType": "uint128",
          "name": "liquidity",
          "type": "uint128"
        },
        {
          "internalType": "uint256",
          "name": "amount0",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "amount1",
          "type": "uint256"
        }
      ],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256"
            },
            {
              "internalType": "uint128",
              "name": "liquidity",
              "type": "uint128"
            },
            {
              "internalType": "uint256",
              "name": "amount0Min",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "amount1Min",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "deadline",
              "type": "uint256"
            }
          ],
          "internalType": "struct INonfungiblePositionManager.DecreaseLiquidityParams",
          "name": "params",
          "type": "tuple"
        }
      ],
      "name": "decreaseLiquidity",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "amount0",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "amount1",
          "type": "uint256"
        }
      ],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256"
            },
            {
              "internalType": "address",
              "name": "recipient",
              "type": "address"
            },
            {
              "internalType": "uint128",
              "name": "amount0Max",
              "type": "uint128"
            },
            {
              "internalType": "uint128",
              "name": "amount1Max",
              "type": "uint128"
            }
          ],
          "internalType": "struct INonfungiblePositionManager.CollectParams",
          "name": "params",
          "type": "tuple"
        }
      ],
      "name": "collect",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "amount0",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "amount1",
          "type": "uint256"
        }
      ],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "factory",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "burn",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    }
  ]

  const ABIFactory = [
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "uint24",
          "name": "fee",
          "type": "uint24"
        },
        {
          "indexed": true,
          "internalType": "int24",
          "name": "tickSpacing",
          "type": "int24"
        }
      ],
      "name": "FeeAmountEnabled",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "oldOwner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "OwnerChanged",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "token0",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "token1",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "uint24",
          "name": "fee",
          "type": "uint24"
        },
        {
          "indexed": false,
          "internalType": "int24",
          "name": "tickSpacing",
          "type": "int24"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "pool",
          "type": "address"
        }
      ],
      "name": "PoolCreated",
      "type": "event"
    },
    {
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint24",
          "name": "fee",
          "type": "uint24"
        }
      ],
      "name": "feeAmountTickSpacing",
      "outputs": [
        {
          "internalType": "int24",
          "name": "",
          "type": "int24"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "tokenA",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "tokenB",
          "type": "address"
        },
        {
          "internalType": "uint24",
          "name": "fee",
          "type": "uint24"
        }
      ],
      "name": "getPool",
      "outputs": [
        {
          "internalType": "address",
          "name": "pool",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "tokenA",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "tokenB",
          "type": "address"
        },
        {
          "internalType": "uint24",
          "name": "fee",
          "type": "uint24"
        }
      ],
      "name": "createPool",
      "outputs": [
        {
          "internalType": "address",
          "name": "pool",
          "type": "address"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_owner",
          "type": "address"
        }
      ],
      "name": "setOwner",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint24",
          "name": "fee",
          "type": "uint24"
        },
        {
          "internalType": "int24",
          "name": "tickSpacing",
          "type": "int24"
        }
      ],
      "name": "enableFeeAmount",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ]

  const ABIPoolv3 = [
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "int24",
          "name": "tickLower",
          "type": "int24"
        },
        {
          "indexed": true,
          "internalType": "int24",
          "name": "tickUpper",
          "type": "int24"
        },
        {
          "indexed": false,
          "internalType": "uint128",
          "name": "amount",
          "type": "uint128"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount0",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount1",
          "type": "uint256"
        }
      ],
      "name": "Burn",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "recipient",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "int24",
          "name": "tickLower",
          "type": "int24"
        },
        {
          "indexed": true,
          "internalType": "int24",
          "name": "tickUpper",
          "type": "int24"
        },
        {
          "indexed": false,
          "internalType": "uint128",
          "name": "amount0",
          "type": "uint128"
        },
        {
          "indexed": false,
          "internalType": "uint128",
          "name": "amount1",
          "type": "uint128"
        }
      ],
      "name": "Collect",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "sender",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "recipient",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint128",
          "name": "amount0",
          "type": "uint128"
        },
        {
          "indexed": false,
          "internalType": "uint128",
          "name": "amount1",
          "type": "uint128"
        }
      ],
      "name": "CollectProtocol",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "sender",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "recipient",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount0",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount1",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "paid0",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "paid1",
          "type": "uint256"
        }
      ],
      "name": "Flash",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint16",
          "name": "observationCardinalityNextOld",
          "type": "uint16"
        },
        {
          "indexed": false,
          "internalType": "uint16",
          "name": "observationCardinalityNextNew",
          "type": "uint16"
        }
      ],
      "name": "IncreaseObservationCardinalityNext",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint160",
          "name": "sqrtPriceX96",
          "type": "uint160"
        },
        {
          "indexed": false,
          "internalType": "int24",
          "name": "tick",
          "type": "int24"
        }
      ],
      "name": "Initialize",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "sender",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "int24",
          "name": "tickLower",
          "type": "int24"
        },
        {
          "indexed": true,
          "internalType": "int24",
          "name": "tickUpper",
          "type": "int24"
        },
        {
          "indexed": false,
          "internalType": "uint128",
          "name": "amount",
          "type": "uint128"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount0",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount1",
          "type": "uint256"
        }
      ],
      "name": "Mint",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint8",
          "name": "feeProtocol0Old",
          "type": "uint8"
        },
        {
          "indexed": false,
          "internalType": "uint8",
          "name": "feeProtocol1Old",
          "type": "uint8"
        },
        {
          "indexed": false,
          "internalType": "uint8",
          "name": "feeProtocol0New",
          "type": "uint8"
        },
        {
          "indexed": false,
          "internalType": "uint8",
          "name": "feeProtocol1New",
          "type": "uint8"
        }
      ],
      "name": "SetFeeProtocol",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "sender",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "recipient",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "int256",
          "name": "amount0",
          "type": "int256"
        },
        {
          "indexed": false,
          "internalType": "int256",
          "name": "amount1",
          "type": "int256"
        },
        {
          "indexed": false,
          "internalType": "uint160",
          "name": "sqrtPriceX96",
          "type": "uint160"
        },
        {
          "indexed": false,
          "internalType": "uint128",
          "name": "liquidity",
          "type": "uint128"
        },
        {
          "indexed": false,
          "internalType": "int24",
          "name": "tick",
          "type": "int24"
        }
      ],
      "name": "Swap",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "int24",
          "name": "tickLower",
          "type": "int24"
        },
        {
          "internalType": "int24",
          "name": "tickUpper",
          "type": "int24"
        },
        {
          "internalType": "uint128",
          "name": "amount",
          "type": "uint128"
        }
      ],
      "name": "burn",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "amount0",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "amount1",
          "type": "uint256"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "recipient",
          "type": "address"
        },
        {
          "internalType": "int24",
          "name": "tickLower",
          "type": "int24"
        },
        {
          "internalType": "int24",
          "name": "tickUpper",
          "type": "int24"
        },
        {
          "internalType": "uint128",
          "name": "amount0Requested",
          "type": "uint128"
        },
        {
          "internalType": "uint128",
          "name": "amount1Requested",
          "type": "uint128"
        }
      ],
      "name": "collect",
      "outputs": [
        {
          "internalType": "uint128",
          "name": "amount0",
          "type": "uint128"
        },
        {
          "internalType": "uint128",
          "name": "amount1",
          "type": "uint128"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "recipient",
          "type": "address"
        },
        {
          "internalType": "uint128",
          "name": "amount0Requested",
          "type": "uint128"
        },
        {
          "internalType": "uint128",
          "name": "amount1Requested",
          "type": "uint128"
        }
      ],
      "name": "collectProtocol",
      "outputs": [
        {
          "internalType": "uint128",
          "name": "amount0",
          "type": "uint128"
        },
        {
          "internalType": "uint128",
          "name": "amount1",
          "type": "uint128"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "factory",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "fee",
      "outputs": [
        {
          "internalType": "uint24",
          "name": "",
          "type": "uint24"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "feeGrowthGlobal0X128",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "feeGrowthGlobal1X128",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "recipient",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount0",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "amount1",
          "type": "uint256"
        },
        {
          "internalType": "bytes",
          "name": "data",
          "type": "bytes"
        }
      ],
      "name": "flash",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint16",
          "name": "observationCardinalityNext",
          "type": "uint16"
        }
      ],
      "name": "increaseObservationCardinalityNext",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint160",
          "name": "sqrtPriceX96",
          "type": "uint160"
        }
      ],
      "name": "initialize",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "liquidity",
      "outputs": [
        {
          "internalType": "uint128",
          "name": "",
          "type": "uint128"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "maxLiquidityPerTick",
      "outputs": [
        {
          "internalType": "uint128",
          "name": "",
          "type": "uint128"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "recipient",
          "type": "address"
        },
        {
          "internalType": "int24",
          "name": "tickLower",
          "type": "int24"
        },
        {
          "internalType": "int24",
          "name": "tickUpper",
          "type": "int24"
        },
        {
          "internalType": "uint128",
          "name": "amount",
          "type": "uint128"
        },
        {
          "internalType": "bytes",
          "name": "data",
          "type": "bytes"
        }
      ],
      "name": "mint",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "amount0",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "amount1",
          "type": "uint256"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "index",
          "type": "uint256"
        }
      ],
      "name": "observations",
      "outputs": [
        {
          "internalType": "uint32",
          "name": "blockTimestamp",
          "type": "uint32"
        },
        {
          "internalType": "int56",
          "name": "tickCumulative",
          "type": "int56"
        },
        {
          "internalType": "uint160",
          "name": "secondsPerLiquidityCumulativeX128",
          "type": "uint160"
        },
        {
          "internalType": "bool",
          "name": "initialized",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint32[]",
          "name": "secondsAgos",
          "type": "uint32[]"
        }
      ],
      "name": "observe",
      "outputs": [
        {
          "internalType": "int56[]",
          "name": "tickCumulatives",
          "type": "int56[]"
        },
        {
          "internalType": "uint160[]",
          "name": "secondsPerLiquidityCumulativeX128s",
          "type": "uint160[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "key",
          "type": "bytes32"
        }
      ],
      "name": "positions",
      "outputs": [
        {
          "internalType": "uint128",
          "name": "_liquidity",
          "type": "uint128"
        },
        {
          "internalType": "uint256",
          "name": "feeGrowthInside0LastX128",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "feeGrowthInside1LastX128",
          "type": "uint256"
        },
        {
          "internalType": "uint128",
          "name": "tokensOwed0",
          "type": "uint128"
        },
        {
          "internalType": "uint128",
          "name": "tokensOwed1",
          "type": "uint128"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "protocolFees",
      "outputs": [
        {
          "internalType": "uint128",
          "name": "token0",
          "type": "uint128"
        },
        {
          "internalType": "uint128",
          "name": "token1",
          "type": "uint128"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint8",
          "name": "feeProtocol0",
          "type": "uint8"
        },
        {
          "internalType": "uint8",
          "name": "feeProtocol1",
          "type": "uint8"
        }
      ],
      "name": "setFeeProtocol",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "slot0",
      "outputs": [
        {
          "internalType": "uint160",
          "name": "sqrtPriceX96",
          "type": "uint160"
        },
        {
          "internalType": "int24",
          "name": "tick",
          "type": "int24"
        },
        {
          "internalType": "uint16",
          "name": "observationIndex",
          "type": "uint16"
        },
        {
          "internalType": "uint16",
          "name": "observationCardinality",
          "type": "uint16"
        },
        {
          "internalType": "uint16",
          "name": "observationCardinalityNext",
          "type": "uint16"
        },
        {
          "internalType": "uint8",
          "name": "feeProtocol",
          "type": "uint8"
        },
        {
          "internalType": "bool",
          "name": "unlocked",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "int24",
          "name": "tickLower",
          "type": "int24"
        },
        {
          "internalType": "int24",
          "name": "tickUpper",
          "type": "int24"
        }
      ],
      "name": "snapshotCumulativesInside",
      "outputs": [
        {
          "internalType": "int56",
          "name": "tickCumulativeInside",
          "type": "int56"
        },
        {
          "internalType": "uint160",
          "name": "secondsPerLiquidityInsideX128",
          "type": "uint160"
        },
        {
          "internalType": "uint32",
          "name": "secondsInside",
          "type": "uint32"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "recipient",
          "type": "address"
        },
        {
          "internalType": "bool",
          "name": "zeroForOne",
          "type": "bool"
        },
        {
          "internalType": "int256",
          "name": "amountSpecified",
          "type": "int256"
        },
        {
          "internalType": "uint160",
          "name": "sqrtPriceLimitX96",
          "type": "uint160"
        },
        {
          "internalType": "bytes",
          "name": "data",
          "type": "bytes"
        }
      ],
      "name": "swap",
      "outputs": [
        {
          "internalType": "int256",
          "name": "amount0",
          "type": "int256"
        },
        {
          "internalType": "int256",
          "name": "amount1",
          "type": "int256"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "int16",
          "name": "wordPosition",
          "type": "int16"
        }
      ],
      "name": "tickBitmap",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "tickSpacing",
      "outputs": [
        {
          "internalType": "int24",
          "name": "",
          "type": "int24"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "int24",
          "name": "tick",
          "type": "int24"
        }
      ],
      "name": "ticks",
      "outputs": [
        {
          "internalType": "uint128",
          "name": "liquidityGross",
          "type": "uint128"
        },
        {
          "internalType": "int128",
          "name": "liquidityNet",
          "type": "int128"
        },
        {
          "internalType": "uint256",
          "name": "feeGrowthOutside0X128",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "feeGrowthOutside1X128",
          "type": "uint256"
        },
        {
          "internalType": "int56",
          "name": "tickCumulativeOutside",
          "type": "int56"
        },
        {
          "internalType": "uint160",
          "name": "secondsPerLiquidityOutsideX128",
          "type": "uint160"
        },
        {
          "internalType": "uint32",
          "name": "secondsOutside",
          "type": "uint32"
        },
        {
          "internalType": "bool",
          "name": "initialized",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "token0",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "token1",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ]

export { ABIWojak, ABILiquidityController, ABIINonfungiblePositionManager, ABIFactory, ABIPoolv3 };
