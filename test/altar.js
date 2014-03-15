var expect = require("expect.js");
var altar = require("../");
var Report = require("../lib/report");

describe("Altar", function () {
  it("creates a report", function () {
    expect(altar.createReport("http://127.0.0.1:3000/")).to.be.a(Report);
  });
});

