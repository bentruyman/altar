var EventEmitter = require("events").EventEmitter;
var util = require("util");

var Browser = require("./browser");
var interpret = require("./image_interpreter").interpret;

var Report = module.exports = function (url) {
  this.browser = new Browser(url);
};

util.inherits(Report, EventEmitter);

Report.prototype.run = function (callback) {
  this.browser.findImages(function (err, images) {
    if (err) {
      if (callback) {
        callback(err);
      } else {
        this.emit("error", err);
      }
      return;
    }

    this.emit("init", images);

    if (images.length === 0) {
      this.emit("end", []);

      if (callback) {
        callback(null, []);
      }
    } else {
      this._readImages(0, images, callback);
    }
  }.bind(this));
};

Report.prototype._readImages = function (i, images, callback) {
  // TODO: add ability to parallelize
  var thisImage = images[i];

  interpret(thisImage.url, function (err, text) {
    thisImage.readText = text;

    this.emit("image", thisImage);

    if (i < images.length - 1) {
      this._readImages(i + 1, images, callback);
    } else {
      this.emit("end", images);

      if (callback) {
        callback(null, images);
      }
    }
  }.bind(this));
};
