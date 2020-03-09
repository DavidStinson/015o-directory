const express = require("express");
const router = express.Router();
const devicesCtrl = require("../controllers/devices");

router.get("/", isLoggedIn, devicesCtrl.index);
router.post("/", isLoggedIn, devicesCtrl.create);
router.get("/new", isLoggedIn, devicesCtrl.new);
router.delete("/:deviceId", isLoggedIn, devicesCtrl.delete);
router.get("/:deviceId", isLoggedIn, devicesCtrl.show);
router.put("/:deviceId", isLoggedIn, devicesCtrl.update);

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/users/login");
}

module.exports = router;