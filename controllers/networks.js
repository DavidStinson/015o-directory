const User = require("../models/user");
const dns = require("dns");
const Netmask = require("netmask").Netmask;
const cidrTools = require("cidr-tools");

module.exports = {
  index,
  new: newNetwork,
  create,
};

function index(req, res) {
  res.render("networks/index", {
    title: "Your Networks",
    user: req.user,
  });
}

/* HEY!!!!!! Don't forget isLoggedIn!!!! */

function newNetwork(req, res) {
  res.render("networks/new", {
    title: "Make a New Network",
    user: req.user,
  });
}

function create(req, res) {
  req.body.fullNtwk = `${req.body.ntwkAddr}/${req.body.cidrMask}`;
  let ipBlock = new Netmask(req.body.fullNtwk);
  req.body.broadcastAddr = ipBlock.broadcast;
  req.body.firstAddr = ipBlock.first;
  req.body.lastAddr = ipBlock.last;
  req.body.ntwkSize = ipBlock.size;
  req.body.subnetMask = ipBlock.mask;
  User.findById(req.user._id, (err, user) => {
    if (err) return next(err);
    user.networks.forEach(network => {
      if (cidrTools.overlap(network.fullNtwk, req.body.fullNtwk)) {
        return res.render("/networks/error", {
          errorMsg: `This network overlaps an existing network: ${network.friendlyName}, which is using ${network.firstAddr} to ${network.lastAddr}`,
        });
      }
      if ((req.body.friendlyName = network.friendlyName)) {
        return res.render("/network/error", {
          errorMsg: `A network with the name ${req.body.friendlyName} already exists.`,
        });
      }
    });
    user.networks.push(req.body);
    user.save(function(err) {
      res.redirect(`/networks`);
    });
  });
}
