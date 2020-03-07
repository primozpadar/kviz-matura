import React, { Component } from "react";
import socketIO from "socket.io-client";
import "./igra.styles.scss";
import IgraVprasanje from "../../components/igra-vprasanje/igra-vprasanje.component";
import IgraOdgovor from "../../components/igra-odgovor/igra-odgovor.component";
import IgraTocke from "../../components/igra-tocke/igra-tocke.component";

//TODO - API za spreminjanje skupin in posiljanje na frontend
const tempTocke = [
  { skupina: "skupinaA", tocke: 10 },
  { skupina: "skupinaB", tocke: 5 },
  { skupina: "skupinaC", tocke: 12 },
  { skupina: "skupinaD", tocke: 0 }
];

class Igra extends Component {
  componentDidMount() {
    const socket = socketIO("http://192.168.43.73:3000");
    socket.on("connect", () => {
      console.log("socket");
    });
  }

  render() {
    return (
      <div className="igra">
        <div className="igra-tocke">
          <IgraTocke tockeData={tempTocke} />
        </div>
        <div className="igra-vprasanje">
          <IgraVprasanje vprasanje="Vprasanje test test test?" />
        </div>
        <div className="igra-odgovori">
          <IgraOdgovor odgovor="A" besedilo="testA" />
          <IgraOdgovor odgovor="B" besedilo="test" />
          <IgraOdgovor odgovor="C" besedilo="test" />
          <IgraOdgovor odgovor="D" besedilo="test" />
        </div>
      </div>
    );
  }
}

export default Igra;
