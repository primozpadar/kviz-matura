import React from "react";
import "./vprasanje.styles.scss";

class VprasanjeForm extends React.Component {
  state = {
    vprasanje: null,
    a: null,
    b: null,
    c: null,
    d: null,
    pravilen_odgovor: null
  };

  handleChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
  };

  handlePOST = e => {
    e.preventDefault();
    const data = this.state;
    console.log(data);
    const URL = "http://localhost:5000/nastavitve/novo-vprasanje";
    fetch(URL, {
      method: "POST",
      headers: {
        "Access-Control-Allow-Origin": "http://localhost:5000"
      },
      mode: "no-cors",
      body: data
    });
  };

  render() {
    return (
      <div className="vprasanje-form">
        <form
          className="form"
          onSubmit={this.handlePOST}
          onChange={this.handleChange}
        >
          <div className="field">
            <label className="field-label" htmlFor="vprasanje">
              Vprašanje:
            </label>
            <input className="field-textbox" type="text" name="vprasanje" />
          </div>
          <Odgovor odgovor="a" />
          <Odgovor odgovor="b" />
          <Odgovor odgovor="c" />
          <Odgovor odgovor="d" />
          <div className="form-center">
            <input className="form-submit" type="submit" value="DODAJ" />
          </div>
        </form>
      </div>
    );
  }
}

const Odgovor = ({ odgovor }) => (
  <div className="field">
    <input
      className="field-radio"
      type="radio"
      name="pravilen_odgovor"
      value={odgovor.toUpperCase()}
    />
    <label
      className="field-label"
      htmlFor={odgovor}
    >{`${odgovor.toUpperCase()}:`}</label>
    <input className="field-textbox" type="text" name={odgovor} />
  </div>
);

export default VprasanjeForm;
