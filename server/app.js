const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/nastavitve", require("./routes/nastavitve"));

app.get("/", (req, res) => {
  res.send("Online");
});

module.exports = app;
