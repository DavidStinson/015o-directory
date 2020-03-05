const express = require("express");
const router = express.Router();

// router.get("/", isLoggedIn, function(req, res, next) {
//   res.render("users/", { title: "015o User Page" });
// });

// router.get("/error", function(req, res, next) {
//   res.render("users/error", { title: "Error!" });
// });

router.get("/login", function(req, res, next) {
  res.render("users/login", { title: "015o Directory Login Page" });
});

router.get("/logout", isLoggedIn, function(req, res) {
  req.logout();
  res.redirect("/");
});

router.get("/:id", isLoggedIn, function(req, res) {
  titleValue = `${req.user.name}'s page`;
  res.render("/users/show", { title: titleValue });
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/users/login");
}

module.exports = router;
