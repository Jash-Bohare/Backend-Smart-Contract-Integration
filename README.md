## Backend – Smart Contract Integration Test

This project demonstrates a backend API that connects to a public Ethereum smart contract and fetches on-chain data.

### Implemented API
- Endpoint: `/Jash_Test`
- Uses ethers.js with a public Ethereum RPC
- Reads data from USDC ERC20 contract
- Fetches name, symbol, and total supply
- Logs data to console and returns JSON response

### How to run
```bash
npm install
npm start
