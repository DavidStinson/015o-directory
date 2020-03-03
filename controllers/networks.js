const Network = require("../models/network");
const dns = require("dns");
var Netmask = require('netmask').Netmask

module.exports = {
  index,
  new: newNetwork,
  confirm
};

function index(req, res) {
  Network.find({ userOwner: req.user }, function(err, networks) {
    if (err) return next(err);
    res.render("networks/index", {
      title: "Your Networks",
      networks,
      user: req.user,
    });
  });
}

/* HEY!!!!!! Don't forget isLoggedIn!!!! */

function newNetwork(req, res) {
  res.render("networks/new", {
    title: "Make a New Network",
    user: req.user,
  });
}

function confirm(req, res) {
  console.log(req.body)
}
