var expect = require("expect.js");
var Browser = require("../lib/browser");
var server = require("./fixtures/server");

describe("Browser", function () {
  before(server.start);
  after(server.stop);

  it("finds a list of images on a page", function (done) {
    var browser = new Browser("http://127.0.0.1:3000/with-alt.html");

    browser.findImages(function (err, images) {
      expect(images[0].altText).to.be("Hello World");
      expect(images[0].url).to.be("http://127.0.0.1:3000/hello-world.png");

      expect(images[1].altText).to.be("Foo Bar");
      expect(images[1].url).to.be("http://127.0.0.1:3000/foo-bar.png");

      expect(images).to.have.length(2);
      done();
    });
  });

  it("provides an error when a page cannot be found", function (done) {
    var browser = new Browser("http://127.0.0.1:3000/empty");

    server.stop();
    browser.findImages(function (err, images) {
      expect(err).not.to.be(null);
      expect(images).to.be(undefined);
      server.start(done);
    });
  });
});
