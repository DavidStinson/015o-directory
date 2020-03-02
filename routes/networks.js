const express = require("express");
const router = express.Router();
const networksCtrl = require("../controllers/networks");

router.get("/", networksCtrl.index);

module.exports = router;
