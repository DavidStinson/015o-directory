const express = require("express");
const router = express.Router();
const networksCtrl = require("../controllers/networks");

router.get("/", networksCtrl.index);
router.get("/new", networksCtrl.new);

module.exports = router;
