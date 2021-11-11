const chapters = [
  {
    title: "The Collector: Chapter 1",
    token:
      "47528499564916269558354577460055188011478914920306765323556974385379743367268",
    href: "https://opensea.io/assets/0x495f947276749ce646f68ac8c248420045cb7b5e/47528499564916269558354577460055188011478914920306765323556974385379743367268",
    count: 0,
  },
  {
    title: "The Collector: Chapter 2",
    token:
      "47528499564916269558354577460055188011478914920306765323556974386479254995044",
    href: "https://opensea.io/assets/0x495f947276749ce646f68ac8c248420045cb7b5e/47528499564916269558354577460055188011478914920306765323556974386479254995044",
    count: 0,
  },

  {
    title: "The Collector: Chapter 3",
    token:
      "47528499564916269558354577460055188011478914920306765323556974388678278250621",
    href: "https://opensea.io/assets/0x495f947276749ce646f68ac8c248420045cb7b5e/47528499564916269558354577460055188011478914920306765323556974388678278250621",
    count: 0,
  },

  {
    title: "The Collector: Chapter 4",
    token:
      "47528499564916269558354577460055188011478914920306765323556974389777789878397",
    href: "https://opensea.io/assets/0x495f947276749ce646f68ac8c248420045cb7b5e/47528499564916269558354577460055188011478914920306765323556974389777789878397",
    count: 0,
  },

  {
    title: "The Collector: Chapter 5",
    token:
      "47528499564916269558354577460055188011478914920306765323556974390877301506198",
    href: "https://opensea.io/assets/0x495f947276749ce646f68ac8c248420045cb7b5e/47528499564916269558354577460055188011478914920306765323556974390877301506198",
    count: 0,
  },

  {
    title: "The Collector: Tribute I",
    token:
      "47528499564916269558354577460055188011478914920306765323556974393076324762300",
    href: "https://opensea.io/assets/0x495f947276749ce646f68ac8c248420045cb7b5e/47528499564916269558354577460055188011478914920306765323556974393076324762300",
    count: 0,
  },
  {
    title: "The Collector: Chapter 6",
    token:
      "47528499564916269558354577460055188011478914920306765323556974396374859645078",
    href: "https://opensea.io/assets/0x495f947276749ce646f68ac8c248420045cb7b5e/47528499564916269558354577460055188011478914920306765323556974396374859645078",
    count: 0,
  },
  {
    title: "The Collector: MintPass",
    token:
      "47528499564916269558354577460055188011478914920306765323556974394175836389476",
    href: "https://opensea.io/assets/0x495f947276749ce646f68ac8c248420045cb7b5e/47528499564916269558354577460055188011478914920306765323556974394175836389476",
    count: 0,
  },
  {
    title: "The Collector: Chapter 7",
    token:
      "47528499564916269558354577460055188011478914920306765323556974397474371272904",
    href: "https://opensea.io/assets/0x495f947276749ce646f68ac8c248420045cb7b5e/47528499564916269558354577460055188011478914920306765323556974397474371272904",
    count: 0,
  },
];

const abi = [
  {
    inputs: [
      {
        internalType: "string",
        name: "uri_",
        type: "string",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "ApprovalForAll",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256[]",
        name: "ids",
        type: "uint256[]",
      },
      {
        indexed: false,
        internalType: "uint256[]",
        name: "values",
        type: "uint256[]",
      },
    ],
    name: "TransferBatch",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "TransferSingle",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "value",
        type: "string",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    name: "URI",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address[]",
        name: "accounts",
        type: "address[]",
      },
      {
        internalType: "uint256[]",
        name: "ids",
        type: "uint256[]",
      },
    ],
    name: "balanceOfBatch",
    outputs: [
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
    ],
    name: "isApprovedForAll",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256[]",
        name: "ids",
        type: "uint256[]",
      },
      {
        internalType: "uint256[]",
        name: "amounts",
        type: "uint256[]",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "safeBatchTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "uri",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];
const tokenContractAddress ="0x495f947276749Ce646f68AC8c248420045cb7b5e";

module.exports = {
    chapters,
    tokenContractAddress,
    abi,
}