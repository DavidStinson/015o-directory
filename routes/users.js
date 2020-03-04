const express = require("express");
const router = express.Router();

router.get("/", isLoggedIn, function(req, res, next) {
  res.render("users/index", { title: "015o Directory User Page" });
});

router.get("/error", isLoggedIn, function(req, res, next) {
  res.render("users/error", { title: "Error!" });
});

router.get("/login", isLoggedIn, function(req, res, next) {
  res.render("users/login", { title: "015o Directory Login Page" });
});

router.get("/logout", isLoggedIn, function(req, res) {
  req.logout();
  res.redirect("/");
});

function isLoggedIn(req,res,next) {
	if(req.isAuthenticated()) return next()
	res.redirect('/users/login')
}

module.exports = router;
