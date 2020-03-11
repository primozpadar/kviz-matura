import React, { Component } from "react";
import socketIO from "socket.io-client";
import "./igra.styles.scss";
import IgraVprasanje from "../../components/igra-vprasanje/igra-vprasanje.component";
import IgraOdgovor from "../../components/igra-odgovor/igra-odgovor.component";
import IgraTocke from "../../components/igra-tocke/igra-tocke.component";

class Igra extends Component {
  state = {
    skupineIme: { A: "X", B: "X", C: "X", D: "X" },
    skupineTocke: { A: 0, B: 0, C: 0, D: 0 },
    vprasanje: "",
    odgovori: {
      A: "",
      B: "",
      C: "",
      D: ""
    },
    odgovoriEnable: {
      A: false,
      B: false,
      C: false,
      D: false
    },
    odgovoriPravilno: {
      A: "",
      B: "",
      C: "",
      D: ""
    }
  };

  componentDidMount() {
    const socket = socketIO("http://192.168.4.1:3000");
    socket.on("connect", () => {
      socket.emit("igra");
      //skupine
      socket.on("skupine-imena", data => {
        this.setState({ skupineIme: data });
      });

      socket.on("skupine-tocke", data => {
        this.setState({ skupineTocke: data });
      });

      //vprasanje
      socket.on("vprasanje-novo", data => {
        this.setState({ vprasanje: data });
      });

      //odgovori
      socket.on("odgovori", data => {
        this.setState({ odgovori: data });
      });

      socket.on("odgovori-enable", data => {
        this.setState({ odgovoriEnable: data });
      });

      socket.on("odgovori-enable-vsi", data => {
        this.setState({
          odgovoriEnable: { A: data, B: data, C: data, D: data }
        });
      });

      socket.on("odgovori-pravilno", data => {
        this.setState({ odgovoriPravilno: data });
      });
    });
  }

  render() {
    return (
      <div className="igra">
        <div className="igra-tocke">
          <IgraTocke
            ime={this.state.skupineIme}
            tocke={this.state.skupineTocke}
          />
        </div>
        <div className="igra-vprasanje">
          <IgraVprasanje vprasanje={this.state.vprasanje} />
        </div>
        <div className="igra-odgovori">
          <IgraOdgovor
            pravilno={this.state.odgovoriPravilno.A}
            odgovor="A"
            besedilo={this.state.odgovori.A}
            enable={this.state.odgovoriEnable.A}
          />
          <IgraOdgovor
            pravilno={this.state.odgovoriPravilno.B}
            odgovor="B"
            besedilo={this.state.odgovori.B}
            enable={this.state.odgovoriEnable.B}
          />
          <IgraOdgovor
            pravilno={this.state.odgovoriPravilno.C}
            odgovor="C"
            besedilo={this.state.odgovori.C}
            enable={this.state.odgovoriEnable.C}
          />
          <IgraOdgovor
            pravilno={this.state.odgovoriPravilno.D}
            odgovor="D"
            besedilo={this.state.odgovori.D}
            enable={this.state.odgovoriEnable.D}
          />
        </div>
      </div>
    );
  }
}

export default Igra;
