import React from "react";
import "./nastavitve.styles.scss";
import VprasanjeForm from "../../components/vprasanje-form/vprasanje-form.component";

class Nastavitve extends React.Component {
  state = {
    addVprasanje: true
  };

  addClick = () => {
    this.setState({ addVprasanje: true });
  };

  render() {
    return (
      <div className="nastavitve">
        <div className="wrap-container">
          {this.state.addVprasanje ? (
            <div className="container">
              <div className="container-flex">
                <p className="container-header">Dodaj novo vprašanje</p>
              </div>
              <VprasanjeForm />
            </div>
          ) : null}
          <div className="container">
            <div className="container-flex">
              <p className="container-header">Vprašanja</p>
              <p className="add-icon" onClick={this.addClick}>
                +
              </p>
            </div>
            <TabelaVprasanja />
          </div>
        </div>
      </div>
    );
  }
}

const TabelaVprasanja = () => (
  <table className="tabela">
    <tbody>
      <tr>
        <th>Vprašanje</th>
        <th>Odgovor A</th>
        <th>Odgovor B</th>
        <th>Odgovor C</th>
        <th>Odgovor D</th>
        <th className="tabela-edit-header"></th>
      </tr>
      <tr>
        <td>AAAAAAAAAAA</td>
        <td>AAAAAAAAAAA</td>
        <td>AAAAAAAAAAA</td>
        <td>AAAAAAAAAAA</td>
        <td>AAAAAAAAAAA</td>
        <td className="tabela-edit">
          <p className="tabela-edit-icon">✎</p>
        </td>
      </tr>
    </tbody>
  </table>
);

export default Nastavitve;
