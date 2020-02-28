const express = require("express");
const router = express.Router();
const tktksCtrl = require("../controllers/tktks");

router.get("/", tktksCtrl.index);

module.exports = router;
