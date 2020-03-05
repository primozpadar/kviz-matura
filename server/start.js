const mongoose = require("mongoose");

require("dotenv").config({ path: "variables.env" });

//mongodb setup
mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});
mongoose.Promise = global.Promise;
mongoose.set("useCreateIndex", true);
mongoose.connection.on("error", err => {
  console.error(`MongoDB ERROR: ${err.message}`);
});

//modeli
require("./models/Vprasanje");

const app = require("./app");
app.set("port", process.env.PORT || 3000);
const server = app.listen(app.get("port"), () => {
  console.log(`Server na portu → ${server.address().port}`);
});
