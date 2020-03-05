const dns = require("dns")

module.exports = {
  index,
  new: newNetwork,
  create,
  show,
  delete: deleteOne,
};

function index(req, res) {
  res.render("devicess/index", {
    title: "Your Devices",
    devicess: req.user.devices,
  });
}

function newNetwork(req, res) {
  res.render("devicess/new", {
    title: "Make a New Device",
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
    res.render("s/error", {
      errorMsg: `A network with the name ${req.body.friendlyName} already exists.`,
      title: "Network Creation Error!",
    });
  }
}

function show(req, res) {
  let network = req.user.networks.id(req.params.ntwkId);
  res.render("devices/show", {
    title: `${device.name}`,
    network,
  });
}

function deleteOne(req, res) {
  req.user.devices.id(req.params.deviceId).remove();
  //req.user.networks.pull(req.params.ntwkId);
  res.redirect("devices/");
}
