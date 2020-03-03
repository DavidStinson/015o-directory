const express = require("express");
const router = express.Router();

router.get('/', function(req, res, next) {
  res.render("users/index"), {
    title: "015o Directory User Page",
    user: req.user
  }
});

router.get('/error', function(req, res, next) {
  res.render("users/error"), {
    title: "Error!",
    user: req.user
  }
});

router.get('/login', function(req, res, next) {
  res.render("users/login", {
    title: "015o Directory Login Page",
    user: req.user
  })
})

router.get("/logout", function(req, res) {
  req.logout();
  res.redirect("/");
});

module.exports = router;