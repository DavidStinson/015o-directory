const Netmask = require("netmask").Netmask;
const cidrTools = require("cidr-tools");

module.exports = {
  index,
  new: newNetwork,
  create,
  show,
  delete: deleteOne,
};

function index(req, res) {
  res.render("networks/index", {
    title: "Your Networks",
    networks: req.user.networks,
    devices: req.user.devices,
  });
}

function newNetwork(req, res) {
  res.render("networks/new", {
    title: "Make a New Network",
    user: req.user,
  });
}

function create(req, res) {
  req.body.fullNtwk = `${req.body.ntwkAddr}/${req.body.cidrMask}`;
  let errorCode = null;
  let errMatchNtwkName = null;
  let errMatchNtwkFirstAddr = null;
  let errMatchNtwkLastAddr = null;
  let ipBlock = new Netmask(req.body.fullNtwk);
  req.body.fullNtwk = `${ipBlock.base}/${req.body.cidrMask}`;
  req.body.ntwkAddr = ipBlock.base;
  req.body.broadcastAddr = ipBlock.broadcast;
  req.body.firstAddr = ipBlock.first;
  req.body.lastAddr = ipBlock.last;
  req.body.ntwkSize = ipBlock.size;
  req.body.subnetMask = ipBlock.mask;
  req.user.networks.forEach(network => {
    if (cidrTools.overlap(network.fullNtwk, req.body.fullNtwk)) {
      errorCode = 1;
      errMatchNtwkName = network.friendlyName;
      errMatchNtwkFirstAddr = network.firstAddr;
      errMatchNtwkLastAddr = network.lastAddr;
    }
    if (req.body.friendlyName === network.friendlyName) {
      errorCode = 2;
    }
  });
  if (!errorCode) {
    req.user.networks.push(req.body);
    req.user.save(function(err) {
      res.redirect(`/networks`);
    });
  } else if (errorCode === 1) {
    res.render("networks/error", {
      errorMsg: `This network overlaps an existing network: ${errMatchNtwkName} which is using address range ${errMatchNtwkFirstAddr} to ${errMatchNtwkLastAddr}`,
      title: "Network Creation Error!",
    });
  } else {
    res.render("networks/error", {
      errorMsg: `A network with the name ${req.body.friendlyName} already exists.`,
      title: "Network Creation Error!",
    });
  }
}

function show(req, res) {
  let network = req.user.networks.id(req.params.ntwkId);
  res.render("networks/show", {
    title: `${network.friendlyName} Network`,
    network,
  });
}

function deleteOne(req, res) {
  req.user.networks.id(req.params.ntwkId).remove();
  req.user.save(function(err) {
    console.log(`Removed!`);
  });
  res.redirect("/networks");
}
