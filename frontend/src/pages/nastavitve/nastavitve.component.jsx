import React from "react";
import "./nastavitve.styles.scss";
import socketIO from "socket.io-client";
import {
  VprasanjeForm,
  KategorijaForm
} from "../../components/nastavitve-form/nastavitve-form.component";
import NastavitveTabela from "../../components/nastavitve-tabela/nastavitve-tabela.component";

class Nastavitve extends React.Component {
  constructor(props) {
    super(props);
    this.socket = this.socketInit();
    this.state = {
      showForm: null,
      kategorije: null,
      izbranaKategorijaId: null,
      vprasanja: null
    };
  }

  socketInit() {
    const socket = socketIO("http://192.168.4.1:3000");
    socket.on("connect", () => {
      socket.emit("nastavitve");
      socket.on("nastavitve-kategorije", data => {
        this.setState({ kategorije: data });
      });
      socket.on("nastavitve-vprasanja", data => {
        this.setState({ vprasanja: data });
        this.setState({ izbranaKategorijaId: data._id });
      });
    });
    return socket;
  }

  novoVprasanje = vprasanjeData => {
    this.socket.emit("nastavitve-vprasanje-novo", vprasanjeData);
  };

  novaKategorija = kategorijaData => {
    this.socket.emit("nastavitve-kategorija-novo", kategorijaData);
  };

  getVprasanja = kategorijaId => {
    this.socket.emit("nastavitve-vprasanja-get", kategorijaId);
  };

  closeForm = kategorijaId => {
    if (kategorijaId) {
      this.getVprasanja(kategorijaId);
      this.setState({ izbranaKategorijaId: kategorijaId });
    }
    this.setState({ showForm: "" });
  };

  showAddKategorija = () => {
    this.setState({ showForm: "kategorija" });
  };

  showAddVprasanje = () => {
    this.setState({ showForm: "vprasanje" });
  };

  nazajHandler = () => {
    this.props.history.push("/");
  };

  render() {
    return (
      <div className="nastavitve">
        <button className="nastavitve-nazaj" onClick={this.nazajHandler}>
          &times;
        </button>
        <div className="wrap-container">
          {this.state.showForm === "vprasanje" ? (
            <VprasanjeForm
              socketSubmit={this.novoVprasanje}
              kategorije={this.state.kategorije}
              izbranaKategorijaId={this.state.izbranaKategorijaId}
              closeForm={this.closeForm}
            />
          ) : this.state.showForm === "kategorija" ? (
            <KategorijaForm
              socketSubmit={this.novaKategorija}
              closeForm={this.closeForm}
            />
          ) : null}
          <div className="container">
            <div className="container-flex">
              <div className="container-vprasanje">
                <p className="container-header">Vprašanja</p>
                <SelectKategorija
                  kategorije={this.state.kategorije}
                  izbranaKategorijaId={this.state.izbranaKategorijaId}
                  selectHandler={this.getVprasanja}
                />
              </div>
              <div className="container-gumbi">
                <div className="gumb-kat" onClick={this.showAddKategorija}>
                  Dodaj kategorijo
                </div>
                <div className="gumb-vpr" onClick={this.showAddVprasanje}>
                  Dodaj vprašanje
                </div>
              </div>
            </div>
            {this.state.vprasanja ? (
              <NastavitveTabela data={this.state.vprasanja} />
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

//FIXME - popravi option za "ni kategorij" - ne prikaze se tudi ce ni kategorij
const SelectKategorija = ({
  kategorije,
  izbranaKategorijaId,
  selectHandler
}) => {
  const HandleChange = e => {
    selectHandler(e.target.value);
  };

  return (
    <select
      onChange={HandleChange}
      className="select-kategorija"
      id="kategorija"
      value={izbranaKategorijaId || "a"}
      required
    >
      <option hidden>Izberi kategorijo...</option>
      {kategorije
        ? kategorije.map(x => (
            <option key={x._id} value={x._id}>
              {x.kategorija}
            </option>
          ))
        : null}
    </select>
  );
};

export default Nastavitve;
