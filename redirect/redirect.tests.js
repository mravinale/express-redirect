const superagent = require("superagent");
const mockServer = require("mockttp").getLocal();
const chai = require("chai");
const app = require("./redirect");

const expect = chai.expect;
const should = chai.should();
var server = null;

describe("Integration tests", () => {
  // Start your server
  before(() => {
    server = app.listen(3000);
    mockServer.start(8080);
  });
  after(() => {
    mockServer.stop();
    server.close();
  });

  describe("When we call to redirector with valid header", () => {
    it("Should redirect GET calls and return json response", () => {
      // Arrange
      return mockServer
        .get("/test")
        .withHeaders({
          "Content-Type": "application/json",
          "x-access-token": "xxx"
        })
        .thenJSON(200, { test: "test" })
        .then(() => {
          // Act
          return superagent
            .get("http://localhost:3000/test")
            .set("Content-Type", "application/json")
            .set("x-access-token", "xxx");
        })
        .then(response => {
          // Assert
          response.body.test.should.exist;
          response.body.test.should.equal("test");
        });
    });

    it("Should redirect PUT calls and return json response", () => {
      // Arrange
      return mockServer
        .put("/test")
        .withHeaders({
          "Content-Type": "application/json",
          "x-access-token": "xxx"
        })
        .thenJSON(200, { test: "test" })
        .then(() => {
          // Act
          return superagent
            .put("http://localhost:3000/test")
            .set("Content-Type", "application/json")
            .set("x-access-token", "xxx");
        })
        .then(response => {
          // Assert
          response.body.test.should.exist;
          response.body.test.should.equal("test");
        });
    });

    it("Should redirect POST calls and return json response", () => {
      // Arrange
      return mockServer
        .post("/test")
        .withHeaders({
          "Content-Type": "application/json",
          "x-access-token": "xxx"
        })
        .thenJSON(200, { test: "test" })
        .then(() => {
          // Act
          return superagent
            .post("http://localhost:3000/test")
            .set("Content-Type", "application/json")
            .set("x-access-token", "xxx");
        })
        .then(response => {
          // Assert
          response.body.test.should.exist;
          response.body.test.should.equal("test");
        });
    });

    it("Should redirect DELETE calls and return json response", () => {
      // Arrange
      return mockServer
        .delete("/test")
        .withHeaders({
          "Content-Type": "application/json",
          "x-access-token": "xxx"
        })
        .thenJSON(200, { test: "test" })
        .then(() => {
          // Act
          return superagent
            .delete("http://localhost:3000/test")
            .set("Content-Type", "application/json")
            .set("x-access-token", "xxx");
        })
        .then(response => {
          // Assert
          response.body.test.should.exist;
          response.body.test.should.equal("test");
        });
    });
  });

  describe("Json returns:", () => {
    xit("Should redirect GET calls and return json response", () => {
      // Arrange
      return mockServer
        .get("/test")
        .withHeaders({
          "Content-Type": "application/json",
          "x-access-token": "xxx"
        })
        .thenJSON(200, { test: "test" })
        .then(() => {
          // Act
          return superagent.get("http://localhost:3000/test");
        })
        .then(response => {
          // Assert
          response.body.test.should.exist;
          response.body.test.should.equal("test");
        });
    });
  });
});
