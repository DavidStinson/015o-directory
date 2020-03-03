const express = require("express");
const router = express.Router();
const networksCtrl = require("../controllers/networks");

router.get("/", isLoggedIn, networksCtrl.index);
router.get("/new", isLoggedIn, networksCtrl.new);
router.post("/confirm-new", isLoggedIn, networksCtrl.confirm)

function isLoggedIn(req,res,next) {
	if(req.isAuthenticated()) return next()
	res.redirect('/users/login')
}

module.exports = router;
