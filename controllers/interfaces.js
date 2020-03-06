const Interface = require("../models/interface");

module.exports = {
  create,
  new: newInterface,
  delete: deleteInterface,
};

function newInterface(req, res) {
  let device = req.user.devices.id(req.params.deviceId);
  res.render("interfaces/new", { title: "Add Interface", device });
}

function create(req, res) {
  req.body.device = req.params.deviceId;
  Interface.create(req.body, err => {
    res.redirect(`/devices/${req.params.deviceId}`);
  });
}

function deleteInterface(req, res) {
  Interface.findByIdAndDelete(req.params.interfaceId, (err, ticket) => {
    res.redirect(`/devices/${req.params.deviceId}`);
  });
}
