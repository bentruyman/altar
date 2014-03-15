var jsdom = require("jsdom");
var request = require("request");

var Image = require("./image");

var Browser = module.exports = function (url) {
  // TODO: prefix url with http (and maybe try with https upon failure) if a protocol doesn't exist
  this.url = url;
};

Browser.prototype.findImages = function (callback) {
  jsdom.env({ url: this.url, done: function (err, window) {
    var elements, images;

    if (err) {
      return callback(err);
    }

    elements = window.document.getElementsByTagName("img");
    images = Array.prototype.map.call(elements, function (element) {
      return new Image(element);
    });

    callback(null, images);
  }});
};

