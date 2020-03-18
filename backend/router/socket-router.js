const socketRouter = (server, app, db, dbSkupine) => {
  const io = require("socket.io")(server);
  const displayHandler = new (require("../display-handler"))();
  const IGRA = new (require("../igra"))(io, displayHandler);
  const GPIO = require("onoff").Gpio;
  const tipkaA = new GPIO(17, "in", "rising");
  const tipkaB = new GPIO(27, "in", "rising");

  io.on("connection", socket => {
    //-----HOMEPAGE-----//
    socket.on("homepage", () => {
      if (!IGRA.stanje) {
        IGRA.konecIgre = false;
        displayHandler.homescreen();
        db.find({ kategorija: { $exists: true } }, { kategorija: 1, _id: 1 })
          .sort({ kategorija: 1 })
          .exec((err, docs) => {
            tipkaA.watch(() => {
              socket.emit("homepage-izberi_kategorijo", docs);
              tipkaB.watch(() => {
                socket.emit("homepage-next_kategorija");
              });
              displayHandler.izberiKategorijo();
              tipkaA.unwatch();
            });
            socket.on("homepage-izbrana_kategorija", async data => {
              kategorijaId = data;
              tipkaA.unwatch();
              await delay(100);
              tipkaA.watch(() => {
                tipkaB.unwatch();
                db.findOne(
                  { _id: kategorijaId },
                  { vprasanja: 1, _id: 0 }
                ).exec((err, docs) => {
                  if (docs.vprasanja.length !== 0) {
                    dbSkupine.findOne(
                      { _id: "skupine" },
                      { _id: 0 },
                      (err, docs) => {
                        IGRA.skupineImena = docs;
                      }
                    );
                    IGRA.vprasanja = premesajArr(docs.vprasanja);
                    io.emit("homepage-start");
                  } else {
                    //TODO - emmit ni vprasanj
                  }
                });
              });
            });
          });
      } else {
        io.emit("homepage-start");
      }
    });

    socket.on("nastavitve", () => {
      tipkaA.unwatch();
      tipkaB.unwatch();
      require("./nastavitve-router")(socket, db);
    });

    //-----SKUPINE-----//
    socket.on("skupine-get", () => {
      dbSkupine.findOne({ _id: "skupine" }, { _id: 0 }, (err, docs) => {
        socket.emit("skupine", docs);
      });
    });
    socket.on("skupine-set", data => {
      dbSkupine.update({ _id: "skupine" }, data);
    });

    //-----IGRA-----//
    socket.on("igra", data => {
      //TODO - pred igro pokazi nekaj (Kviz bla bla bla ...) (ce je to zacetek)
      //mogoce status screen za kontrolerje?

      //pokazi vprasanja ko pritisnes tipko A
      const tipkaA_pokaziOdg = () => {
        displayHandler.pokaziOdgovore();
        displayHandler.praznoB();
        tipkaA.watch(() => {
          IGRA.startOdgovarjanje();
          tipkaA.unwatch();
        });
      };

      IGRA.start(novCli => {
        if (novCli) {
          IGRA.init(socket);
        } else {
          tipkaA_pokaziOdg();
        }
      });

      //funkcija je klicana ob vsakem pritisku tipke na kontrolerju
      const action = ({ tipka, skupina }) => {
        //cakanje, da igralci pritisnejo tipko
        IGRA.odgovor({ tipka, skupina }, () => {
          //callback ko je doloceno ali je odgovor napacen ali pravilen
          //ko je pritisnjena tipka B, se poslje novo vprasanje in odgovore
          IGRA.isKonec(konec => {
            if (konec) {
              tipkaA.watch(() => {
                io.emit("igra-showStats");
                tipkaA.unwatch();
              });
              tipkaB.watch(() => {
                io.emit("redirect-home");
                tipkaB.unwatch();
              });
            } else {
              tipkaB.watch(() => {
                tipkaA_pokaziOdg();
                IGRA.sendVprasanje({ novo: true });
                tipkaB.unwatch();
              });
            }
          });
        });
      };

      app.get("/action", (req, res) => {
        const { tipka, skupina, status } = req.query;
        if (tipka && skupina) {
          action({ tipka, skupina });
        }
        //ko je povezava z kontrolerjem vzpostavljena
        if (status) {
          console.log(skupina + status);
        }
        res.sendStatus(200);
      });
    });
  });
};

function premesajArr(array) {
  //Fisher-Yates shuffle
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = socketRouter;
