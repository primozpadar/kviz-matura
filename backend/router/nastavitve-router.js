const nastavitveRouter = (socket, db) => {
  const sendKategorije = () => {
    db.find({ kategorija: { $exists: true } }, { kategorija: 1, _id: 1 })
      .sort({ kategorija: 1 })
      .exec((err, docs) => {
        socket.emit("nastavitve-kategorije", docs);
      });
  };

  const novaKategorija = data => {
    const doc = {
      kategorija: data,
      vprasanja: []
    };
    db.insert(doc, (err, newDoc) => {
      if (err) {
        console.log("\x1b[31m", "[DB ERR]: dodajanje kategorije", "\x1b[0m");
      } else {
        sendKategorije();
      }
    });
  };

  const novoVprasanje = data => {
    const { kategorijaId } = data;
    delete data.kategorijaId;
    db.update({ _id: kategorijaId }, { $addToSet: { vprasanja: data } }, {});
  };

  const getVprasanja = (kategorijaId, callback) => {
    db.findOne({ _id: kategorijaId }, (err, docs) => {
      if (err) {
        console.log("\x1b[31m", "[DB ERR]: get vprasanja", "\x1b[0m");
      } else {
        callback(docs);
      }
    });
  };

  //init
  sendKategorije();

  //vprasanja
  socket.on("nastavitve-vprasanje-novo", data => {
    novoVprasanje(data);
  });

  socket.on("nastavitve-vprasanja-get", kategorijaId => {
    getVprasanja(kategorijaId, vprasanja => {
      socket.emit("nastavitve-vprasanja", vprasanja);
    });
  });

  socket.on("nastavitve-kategorija-novo", kategorija => {
    novaKategorija(kategorija);
  });

  //TODO-vprasanje-odstrani
  //TODO-vprasanje-edit
};

module.exports = nastavitveRouter;
