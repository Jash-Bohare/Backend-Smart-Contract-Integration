const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const router = require("./routes/index.js");
const { ethers } = require("ethers");

const app = express();

// config
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config({ path: "backend/config/config.env" });
}
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());
app.use(router);
__dirname = path.resolve();
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("Server is Running! 🚀");
  });
}

app.get("/Jash_Test", async (req, res) => {
  try {
    const provider = new ethers.JsonRpcProvider(
      "https://eth.llamarpc.com"
    );

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
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch contract data" });
  }
});

module.exports = app;
