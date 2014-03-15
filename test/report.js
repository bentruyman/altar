var expect = require("expect.js");
var Report = require("../lib/report");
var server = require("./fixtures/server");

describe("Report", function () {
  before(server.start);
  after(server.stop);

  describe("reading images on a page", function () {
    describe("exposing a callback interface", function () {
      it("finds images with text", function (done) {
        var report = new Report("http://127.0.0.1:3000/with-alt.html");

        report.run(function (err, images) {
          expect(images[0].altText).to.be("Hello World");
          expect(images[0].url).to.be("http://127.0.0.1:3000/hello-world.png");
          expect(images[0].readText).to.be("Hello World");
          expect(images[0].state).to.be("good");

          expect(images[1].altText).to.be("Foo Bar");
          expect(images[1].url).to.be("http://127.0.0.1:3000/foo-bar.png");
          expect(images[1].readText).to.be("Foo Bar");
          expect(images[1].state).to.be("good");

          expect(err).to.be(null);
          expect(images).to.have.length(2);
          done();
        });
      });

      it("finds images without text", function (done) {
        var report = new Report("http://127.0.0.1:3000/without-alt.html");

        report.run(function (err, images) {
          expect(images[0].altText).to.be(null);
          expect(images[0].url).to.be("http://127.0.0.1:3000/hello-world.png");
          expect(images[0].readText).to.be("Hello World");
          expect(images[0].state).to.be("bad");

          expect(images[1].altText).to.be(null);
          expect(images[1].url).to.be("http://127.0.0.1:3000/foo-bar.png");
          expect(images[1].readText).to.be("Foo Bar");
          expect(images[1].state).to.be("bad");

          expect(err).to.be(null);
          expect(images).to.have.length(2);
          done();
        });
      });

      it("handles a page with no images", function (done) {
        var report = new Report("http://127.0.0.1:3000/no-images.html");

        report.run(function (err, images) {
          expect(err).to.be(null);
          expect(images).to.have.length(0);
          done();
        });
      });

      it("provides an error when a page cannot be found", function (done) {
        var report = new Report("http://127.0.0.1:3000/");

        server.stop(function () {
          report.run(function (err, images) {
            expect(err).not.to.be(null);
            expect(images).to.be(undefined);
            server.start(done);
          });
        });
      });
    });

    describe("exposing an evented interface", function () {
      it("emits an init event", function (done) {
        var report = new Report("http://127.0.0.1:3000/with-alt.html");

        report.on("init", function (images) {
          expect(images.length).to.be(2);
          done();
        });

        report.run();
      });

      it("emits image events", function (done) {
        var report = new Report("http://127.0.0.1:3000/single.html");

        report.once("image", function (image) {
          expect(image.altText).to.be("Hello World");
          expect(image.url).to.be("http://127.0.0.1:3000/hello-world.png");
          expect(image.readText).to.be("Hello World");
          expect(image.state).to.be("good");

          done();
        });

        report.run();
      });

      it("emits a done event", function (done) {
        var report = new Report("http://127.0.0.1:3000/with-alt.html");

        report.once("end", function (images) {
          expect(images[0].altText).to.be("Hello World");
          expect(images[0].url).to.be("http://127.0.0.1:3000/hello-world.png");
          expect(images[0].readText).to.be("Hello World");
          expect(images[0].state).to.be("good");

          expect(images[1].altText).to.be("Foo Bar");
          expect(images[1].readText).to.be("Foo Bar");
          expect(images[1].url).to.be("http://127.0.0.1:3000/foo-bar.png");
          expect(images[1].state).to.be("good");

          expect(images).to.have.length(2);
          done();
        });

        report.run();
      });

      it("handles a page with no images", function (done) {
        var report = new Report("http://127.0.0.1:3000/no-images.html");

        report.run(function (err, images) {
          expect(err).to.be(null);
          expect(images).to.have.length(0);
          done();
        });
      });

      it("provides an error when a page cannot be found", function (done) {
        var report = new Report("http://127.0.0.1:3000/");

        server.stop(function () {
          report.on("error", function (err) {
            expect(err).not.to.be(null);
            server.start(done);
          });

          report.run();
        });
      });
    });
  });
});

