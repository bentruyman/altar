var expect = require("expect.js");
var interpret = require("../lib/image_interpreter").interpret;
var server = require("./fixtures/server");

describe("Image Interpreter", function () {
  before(server.start);
  after(server.stop);

  it("reads text from an image with text", function (done) {
    interpret("http://127.0.0.1:3000/hello-world.png", function (err, text) {
      expect(err).to.be(null);
      expect(text).to.be("Hello World");
      done();
    });
  });

  it("returns null from an image with no detectable text", function (done) {
    interpret("http://127.0.0.1:3000/no-text.png", function (err, text) {
      expect(err).to.be(null);
      expect(text).to.be(null);
      done();
    });
  });

  it("provides an error when a bad image is interpretted", function (done) {
    interpret("http://127.0.0.1:3000/bad.png", function (err, text) {
      expect(err).not.to.be(null);
      expect(text).to.be(undefined);
      done();
    });
  });

  it("provides an error when an image doesn't exist", function (done) {
    interpret("http://127.0.0.1:3000/404.png", function (err, text) {
      expect(err).not.to.be(null);
      expect(text).to.be(undefined);
      done();
    });
  });
});
