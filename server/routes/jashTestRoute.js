// Experimental route for backend–smart contract integration test

const express = require("express");
const router = express.Router();
const { ethers } = require("ethers");

router.get("/Jash_Test", async (req, res) => {
  try {
    // Connect to Ethereum Mainnet
    const provider = new ethers.JsonRpcProvider(
      "https://eth.llamarpc.com"
    );

    // USDC ERC20 contract details
    const usdcAddress = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";
    const usdcAbi = [
      "function name() view returns (string)",
      "function symbol() view returns (string)",
      "function totalSupply() view returns (uint256)"
    ];

    const contract = new ethers.Contract(usdcAddress, usdcAbi, provider);

    const name = await contract.name();
    const symbol = await contract.symbol();
    const totalSupply = await contract.totalSupply();

    console.log("USDC Name:", name);
    console.log("USDC Symbol:", symbol);
    console.log("USDC Total Supply:", totalSupply.toString());

    res.json({
      success: true,
      name,
      symbol,
      totalSupply: totalSupply.toString()
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch contract data" });
  }
});

module.exports = router;