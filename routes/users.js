const express = require("express");
const router = express.Router();

router.get('/', function(req, res, next) {
  res.render("users/index")
});

router.get('/error', function(req, res, next) {
  res.render("users/error")
});

module.exports = router;