const express = require("express");
const router = express.Router();
const interfacesCtrl = require("../controllers/interfaces");

router.post("/devices/:deviceId/interfaces", isLoggedIn, interfacesCtrl.create);
router.get("/devices/:deviceId/interfaces/new", isLoggedIn, interfacesCtrl.new);
router.delete(
  "/devices/:deviceId/interfaces/:ticketId",
  isLoggedIn,
  interfacesCtrl.delete
);

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/users/login");
}

module.exports = router;
