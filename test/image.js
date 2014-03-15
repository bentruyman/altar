var expect = require("expect.js");
var Image = require("../lib/image");
var server = require("./fixtures/server");

describe("Image", function () {
  it("transforms an image DOM element into a more readable interface", function () {
    var image = new Image({
      alt: "alt",
      src: "src"
    });

    expect(image.altText).to.be("alt");
    expect(image.url).to.be("src");
  });

  describe("expressing its state", function () {
    it("is UNSUPPORTED if it has undefined readable text", function () {
      var image = new Image({ alt: null });
      image.readText = undefined;

      expect(image.state).to.be(Image.UNSUPPORTED);
    });

    it("is BAD if it has readable text but empty alt text", function () {
      var image = new Image({ alt: "" });
      image.readText = "text";

      expect(image.state).to.be(Image.BAD);
    });

    it("is BAD if it has readable text but null alt text", function () {
      var image = new Image({ alt: null });
      image.readText = "text";

      expect(image.state).to.be(Image.BAD);
    });

    it("is UNDETERMINED if it has readable text not equal to its declared alt text", function () {
      var image = new Image({ alt: "test" });
      image.readText = "text";

      expect(image.state).to.be(Image.UNDETERMINED);
    });

    it("is UNDETERMINED if it has no readable text but has alt text", function () {
      var image = new Image({ alt: "text" });
      image.readText = null;

      expect(image.state).to.be(Image.UNDETERMINED);
    });

    it("is GOOD if it has readable text equal to its alt text", function () {
      var image = new Image({ alt: "text" });
      image.readText = "text";

      expect(image.state).to.be(Image.GOOD);
    });

    it("is GOOD if it has no readable text and no alt text", function () {
      var image = new Image({ alt: null });
      image.readText = null;

      expect(image.state).to.be(Image.GOOD);
    });

    it("is GOOD if it has no readable text and empty alt text", function () {
      var image = new Image({ alt: "" });
      image.readText = null;

      expect(image.state).to.be(Image.GOOD);
    });
  });
});
