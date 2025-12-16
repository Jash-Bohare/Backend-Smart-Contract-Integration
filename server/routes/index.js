// Pushing this again

const express = require("express");
const router = express.Router();

const jashTestRoute = require("./jashTestRoute");
const userRoute = require("./userRoute");
const orderRoute = require("./orderRoute");
const paymentRoute = require("./paymentRoute");
const productRoute = require("./productRoute");

router.use("/user", userRoute);
router.use("/order", orderRoute);
router.use("/payment", paymentRoute);
router.use("/product", productRoute);

router.use("/", jashTestRoute);

router.get("/test_ping", (req, res) => {
  res.send("PING OK");
});

module.exports = router;
