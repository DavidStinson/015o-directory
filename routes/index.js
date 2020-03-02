const express = require("express");
const router = express.Router();
const passport = require("passport");

router.get("/", function(req, res, next) {
  res.render("index", { title: "Tktk Index" });
});

router.get("/auth/apple", passport.authenticate("apple"));

router.post(
  "/auth/apple/callback",
  express.urlencoded({ extended: true }),
  passport.authenticate("apple", {
    successRedirect: "/",
    failureRedirect: "/users/error",
  })
);

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/auth/google/oauth2callback",
  passport.authenticate("google", {
    successRedirect: "/",
    failureRedirect: "/users/error",
  })
);

router.get("/logout", function(req, res) {
  req.logout();
  res.redirect("/users");
});

module.exports = router;
