const dns = require("dns");
const cidrTools = require("cidr-tools");
const Interface = require("../models/interface");

module.exports = {
  index,
  new: newDevice,
  create,
  show,
  delete: deleteOne,
  update,
};

function index(req, res) {
  res.render("devices/index", {
    title: "Your Devices",
    devices: req.user.devices,
  });
}

function newDevice(req, res) {
  res.render("devices/new", {
    title: "Make a New Device",
    user: req.user,
  });
}

function create(req, res) {
  let deviceBelongsToNtwk = null;
  let errorCode = null;
  let errMatchDeviceName = null;
  req.body.macAddress = req.body.macAddress.toUpperCase();
  if (req.user.local) {
    dns.setServers(["10.0.0.20"]);
    dns.reverse(req.body.ipAddress, (err, hostNames) => {
      if (hostNames) {
        req.body.hostName = hostNames[0];
      }
    });
  }
  req.user.networks.forEach(network => {
    if (cidrTools.overlap(network.fullNtwk, req.body.ipAddress)) {
      deviceBelongsToNtwk = true;
    }
  });
  req.user.devices.forEach(device => {
    if (req.body.ipAddress === device.ipAddress) {
      errorCode = 1;
      errMatchDeviceName = device.name;
    }
    if (req.body.name === device.name) {
      errorCode = 2;
    }
    if (req.body.macAddress === device.macAddress) {
      errorCode = 3;
      errMatchDeviceName = device.name;
    }
  });
  if (!errorCode && deviceBelongsToNtwk) {
    req.user.devices.push(req.body);
    req.user.save(function(err) {
      res.redirect(`/devices`);
    });
  } else if (!deviceBelongsToNtwk) {
    res.render("devices/error", {
      errorMsg: `There is no network for this device to belong to! Please create a network containing ${req.body.ipAddress} first.`,
      title: "Device Creation Error!",
    });
  } else if (errorCode === 1) {
    res.render("devices/error", {
      errorMsg: `The IP Address ${req.body.ipAddress} is already being used by ${errMatchDeviceName}, please create the device again using an available IP Address.`,
      title: "Device Creation Error!",
    });
  } else if (errorCode === 2) {
    res.render("devices/error", {
      errorMsg: `A device with the name ${req.body.name} already exists, please create the device again using a unique name.`,
      title: "Device Creation Error!",
    });
  } else {
    res.render("devices/error", {
      errorMsg: `The MAC Address ${req.body.macAddress} is already being used by ${errMatchDeviceName}, please create the device again using an available MAC Address.`,
      title: "Device Creation Error!",
    });
  }
}

function show(req, res) {
  let device = req.user.devices.id(req.params.deviceId);
  Interface.find({ device: device._id }, (err, interfaces) => {
    res.render("devices/show", {
      title: `${device.name}`,
      device,
      interfaces,
    });
  });
}

function deleteOne(req, res) {
  req.user.devices.id(req.params.deviceId).remove();
  req.user.save(function(err) {
  });
  res.redirect("/devices");
}

function update(req, res) {
  let device = req.user.devices.id(req.params.deviceId);
  device.ipAddress = req.body.ipAddress;
	device.hostName = req.body.hostName;
	req.user.networks.forEach(network => {
    if (cidrTools.overlap(network.fullNtwk, req.body.ipAddress)) {
      deviceBelongsToNtwk = true;
    }
  });
  req.user.devices.forEach(device => {
    if (req.body.ipAddress === device.ipAddress) {
      errorCode = 1;
      errMatchDeviceName = device.name;
    }
  });
  if (!errorCode && deviceBelongsToNtwk) {
    req.user.devices.push(req.body);
    req.user.save(function(err) {
      res.redirect(`/devices`);
    });
  } else if (!deviceBelongsToNtwk) {
    res.render("devices/error", {
      errorMsg: `There is no network for this device to belong to! Please create a network containing ${req.body.ipAddress} first.`,
      title: "Device Update Error!",
    });
  } else {
    res.render("devices/error", {
      errorMsg: `The IP Address ${req.body.ipAddress} is already being used by ${errMatchDeviceName}, please create the device again using an available IP Address.`,
      title: "Device Creation Error!",
    });
  }

  req.user.save(function(err) {
		console.log(err)
  });
  res.redirect("/devices");
}
