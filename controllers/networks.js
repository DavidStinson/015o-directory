const Network = require("../models/network");
const dns = require("dns");

module.exports = {
  index,
  new: newNetwork,
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

function newNetwork(req, res) {
  Network.find({ userOwner: req.user }, function(err, networks) {
    if (err) return next(err);
    res.render("networks/new", {
      title: "Your Networks",
      networks,
      user: req.user,
    });
  });
}
