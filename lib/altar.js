var Report = require("./report");

module.exports = {
  createReport: function (url) {
    return new Report(url);
  }
};
