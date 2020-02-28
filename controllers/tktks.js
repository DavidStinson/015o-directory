const Tktk = require("../models/tktk");

module.exports = {
  index
};

function index(req, res) {
  Tktk.find({}, function(err, tktks) {
    if (err) return next(err);
    res.render("tktks/index", { tktks });
  });
}
