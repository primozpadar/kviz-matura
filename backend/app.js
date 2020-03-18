const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//app.get("/action", (req, res) => {
//  if (req.query.tipka) {
//    console.log(`skupina: ${req.query.skupina}, tipka: ${req.query.tipka}`);
//  } else if (req.query.status) {
//    console.log(`skupina: ${req.query.skupina}, status: ${req.query.status}`);
//  }
//  res.sendStatus(200);
//});

module.exports = app;
