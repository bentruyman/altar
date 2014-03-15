var exec = require("child_process").exec;
var fs = require("fs");

var request = require("request");
var temp = require("temp");

const PREFIX = "altar";

function interpret(url, callback) {
  var stream = temp.createWriteStream();
  var output = temp.path({ prefix: PREFIX });
  var outputPath = output + ".txt";

  stream.on("finish", function () {
    // TODO: look into node-tesseract
    // TODO: find a way to detect the line number this image is on in the html file
    // TODO: rerun check against an inverted version of the image for images with white text on a transparent background
    // TODO: implement levenshtein scoring
    exec(["tesseract", stream.path, output, "-l eng", "-psm 3"].join(" "), function (err, stdout, stderr) {
      if (err) {
        return callback("Image could not be found or interpreted");
      }

      // TODO: callback hell
      fs.readFile(outputPath, function (err, data) {
        if (err) throw err; // TODO: make more useful
        fs.unlink(stream.path, function (err) {
          if (err) throw err; // TODO: make more useful
          fs.unlink(outputPath, function (err) {
            var text;

            if (err) throw err; // TODO: make more useful

            text = data.toString().trim();

            if (text.length === 0) {
              text = null;
            }

            callback(null, text);
          });
        });
      });
    });
  });

  request(url).pipe(stream);
}

module.exports = {
  interpret: interpret
};
