const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const serveStatic = require("serve-static");
const serveIndex = require("serve-index");
//const ejsLint = require("ejs-lint");

const routes = require("./routes/route");

dotenv.config({ path: "./config.env" });

const app = express();

app.use(express.json());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname + "/public")));

var port = process.env.PORT || 3056;

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use(serveStatic(".", { etag: false })).use(serveIndex("."));
// app.get("/", routes.index);
// app.get("/testapp", routes.browsedir);
// app.get("/testapp/*", routes.browsesubdir, function (req, res) {
//   app.set("views", path.join(__dirname, req.testViewdir)); //req.testViewdir);
//   res.render("index", { apiList: { lang: "abcd" } });
// });

app.all("*", (req, res, next) => {
  const err = `can't find ${req.originalUrl} on this server!`;

  next(err);
});

var server = app.listen(port, function (req, res) {
  console.log("Catch the action at http://localhost:" + port);
});
