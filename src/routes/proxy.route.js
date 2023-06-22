const express = require("express");
const router = express.Router();
const proxyController = require("../controllers/proxy.controller");

router.route("/proxy").get(proxyController.getWeather);
module.exports = router;
