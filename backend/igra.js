class Igra {
  constructor(io, displayHandler) {
    this.io = io;
    this.displayHandler = displayHandler;
    this.stanje = false;
    this.indexVprasanje = 0;
    this.vprasanja = [];
    this.stanjeOdgovarjanje = false;
    this.konecIgre = false;
    this.skupineTocke = { A: 0, B: 0, C: 0, D: 0 };
    this.skupineImena = { A: "A", B: "B", C: "C", D: "D" }; //TODO - database
  }

  start(initCallback) {
    //ce se igra se ni zacela, se zacne, drugace poslje vse podatke na frontend o ze delujoci igri
    if (!this.konecIgre) {
      if (!this.stanje) {
        this.stanje = true;
        this.sendVprasanje({ novo: false });
        this.io.emit("skupine-imena", this.skupineImena);
        initCallback(false);
      } else {
        initCallback(true);
      }
    } else {
      this.konec();
    }
  }

  init(socket) {
    const odgovori = this.vprasanja[this.indexVprasanje].odgovori;
    const vprasanje = this.vprasanja[this.indexVprasanje].vprasanje;
    socket.emit("skupine-tocke", this.skupineTocke);
    socket.emit("skupine-imena", this.skupineImena);
    socket.emit("vprasanje-novo", vprasanje);
    socket.emit("odgovori", odgovori);
    socket.emit("odgovori-enable-vsi", this.stanjeOdgovarjanje);
  }

  reStart() {
    this.stanje = false;
    this.indexVprasanje = 0;
    this.stanjeOdgovarjanje = false;
    this.konecIgre = false;
    this.skupineTocke = { A: 0, B: 0, C: 0, D: 0 };
    this.skupineImena = { A: "A", B: "B", C: "C", D: "D" };
  }

  sendVprasanje({ novo }) {
    if (novo) {
      this.indexVprasanje++;
    }
    const odgovori = this.vprasanja[this.indexVprasanje].odgovori;
    const vprasanje = this.vprasanja[this.indexVprasanje].vprasanje;
    this.pokaziOdgovore(false);
    this.io.emit("vprasanje-novo", vprasanje);
    this.io.emit("odgovori", odgovori);
    this.io.emit("odgovori-pravilno", { A: "", B: "", C: "", D: "" });
  }

  isKonec(konecCallback) {
    if (this.vprasanja.length <= this.indexVprasanje + 1) {
      this.displayHandler.konec();
      this.konec();
      konecCallback(true);
    } else {
      this.displayHandler.praznoA();
      this.displayHandler.naslednjeVprasanje();
      konecCallback(false);
    }
  }

  pokaziOdgovore(val) {
    this.io.emit("odgovori-enable-vsi", val);
  }

  startOdgovarjanje() {
    this.pokaziOdgovore(true);
    this.displayHandler.cakamOdgovor();
    this.stanjeOdgovarjanje = true;
  }

  odgovor({ tipka, skupina }, naslednjeVprasanjeCallback) {
    if (this.stanjeOdgovarjanje) {
      this.stanjeOdgovarjanje = false;
      const odgovoriPravilno = this.vprasanja[this.indexVprasanje].pravilno;
      const imeSkupine = this.skupineImena[skupina];
      if (odgovoriPravilno[tipka]) {
        this.tockovanje({ skupina, pravilno: true });
        this.io.emit("odgovori-pravilno", { [tipka]: "DA" });
        this.io.emit("vprasanje-novo", `${imeSkupine} - PRAVILNO!`);
      } else {
        this.tockovanje({ skupina, pravilno: false });
        this.io.emit("vprasanje-novo", `${imeSkupine} - Napačen odgovor!`);
        if (odgovoriPravilno.A === true) {
          this.io.emit("odgovori-pravilno", { A: "DA", [tipka]: "NE" });
        } else if (odgovoriPravilno.B === true) {
          this.io.emit("odgovori-pravilno", { B: "DA", [tipka]: "NE" });
        } else if (odgovoriPravilno.C === true) {
          this.io.emit("odgovori-pravilno", { C: "DA", [tipka]: "NE" });
        } else if (odgovoriPravilno.D === true) {
          this.io.emit("odgovori-pravilno", { D: "DA", [tipka]: "NE" });
        }
      }
      naslednjeVprasanjeCallback();
    }
  }

  tockovanje({ skupina, pravilno }) {
    if (pravilno) {
      this.skupineTocke[skupina]++;
    } else {
      this.skupineTocke[skupina]--;
    }
    this.io.emit("skupine-tocke", this.skupineTocke);
  }

  konec = async () => {
    this.reStart();
    await delay(2000);
    this.io.emit("konec", true);
  };
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = Igra;
