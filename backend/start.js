const app = require("./app");
const server = require("http").createServer(app);

const Datastore = require("nedb");
db = new Datastore({ filename: "./database-vprasanja", autoload: true });
dbSkupine = new Datastore({ filename: "./database-skupine", autoload: true });

require("./router/socket-router")(server, app, db, dbSkupine);

server.listen(3000, () => {
  console.log("Server na portu 3000");
});
