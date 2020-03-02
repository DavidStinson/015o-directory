const Network = require("../models/network");
const dns = require("dns");

module.exports = {
  index,
};

function index(req, res) {
  Network.find({}, function(err, networks) {
    if (err) return next(err);
    dns.setServers(["10.0.0.20", "9.9.9.9"]);
    dns.reverse("10.0.0.29", (err, hostName) => {
      res.render("networks/index", {
        networks,
        hostName,
        user: req.user,
        name: req.query.name,
      });
    });
  });
}
