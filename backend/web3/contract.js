require('dotenv').config();
const { ethers } = require('ethers');

const provider = new ethers.JsonRpcProvider('https://rpc.chiadochain.net');
const wallet = new ethers.Wallet(process.env.ADMIN_PRIVATE_KEY, provider);

const contractAddress = '0x4E2BdC361753BC9280204D1dA0764324A427727f'; // update if changed
const abi = [
  "function sendReward(address recipient, uint256 amount) public"
];

const contract = new ethers.Contract(contractAddress, abi, wallet);

module.exports = { contract };
