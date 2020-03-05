const express = require("express");
const router = express.Router();

//nastavitve router
router.post("/novo-vprasanje", (req, res) => {
  console.log(req.body);
  res.sendStatus(200);
});

module.exports = router;
