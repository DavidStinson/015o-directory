const express = require("express");
const router = express.Router();
const passport = require("passport");

router.get("/", function(req, res, next) {
  res.render("index", { title: "015o Directory" });
});

router.get("/auth/apple", passport.authenticate("apple"));

router.post(
  "/auth/apple/callback",
  express.urlencoded({ extended: true }),
  passport.authenticate("apple", {
    successRedirect: "/networks",
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
    successRedirect: "/networks",
    failureRedirect: "/users/error",
  })
);

module.exports = router;
