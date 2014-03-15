const BAD = "bad";
const GOOD = "good";
const UNDETERMINED = "undetermined";
const UNSUPPORTED = "unsupported";

var Image = module.exports = function (element) {
  this.altText = element.alt;
  this.readText = null;
  this.url = element.src;

  Object.defineProperty(this, "state", {
    enumerable: true,
    get: function () {
      var altText = this.altText,
          readText = this.readText;

      if (readText === undefined) {
        return UNSUPPORTED;
      } else if (readText === null && (altText === null || altText === "")) {
        return GOOD;
      } else if (readText === null && altText !== null) {
        return UNDETERMINED;
      } else if (readText.length > 0 && (altText === null || altText === "")) {
        return BAD;
      } else if (readText === altText) {
        return GOOD;
      } else {
        return UNDETERMINED;
      }
    }
  });
};

Image.BAD = BAD;
Image.GOOD = GOOD;
Image.UNDETERMINED = UNDETERMINED;
Image.UNSUPPORTED = UNSUPPORTED;
