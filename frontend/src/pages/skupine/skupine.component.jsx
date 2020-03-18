import React from "react";
import socketIO from "socket.io-client";

import "./skupine.styles.scss";

class Skupine extends React.Component {
  constructor(props) {
    super(props);
    this.socket = this.socketInit();
    this.state = {
      A: null,
      B: null,
      C: null,
      D: null
    };
  }

  socketInit = () => {
    const socket = socketIO("http://192.168.4.1:3000");
    socket.on("connect", () => {
      socket.emit("skupine-get");
      socket.on("skupine", ({ A, B, C, D }) => {
        this.setState({ A, B, C, D });
      });
    });
    return socket;
  };

  shraniHandler = e => {
    e.preventDefault();
    const data = {
      A: this.state.A,
      B: this.state.B,
      C: this.state.C,
      D: this.state.D
    };
    this.socket.emit("skupine-set", data);
    this.socket.disconnect();
    window.location = "/";
  };

  render() {
    return (
      <div className="skupine">
        <div className="skupine-container">
          <form onSubmit={this.shraniHandler}>
            <InputSkupina
              skupina="A"
              changeHandler={val => this.setState({ A: val })}
              value={this.state.A}
            />
            <InputSkupina
              skupina="B"
              changeHandler={val => this.setState({ B: val })}
              value={this.state.B}
            />
            <InputSkupina
              skupina="C"
              changeHandler={val => this.setState({ C: val })}
              value={this.state.C}
            />
            <InputSkupina
              skupina="D"
              changeHandler={val => this.setState({ D: val })}
              value={this.state.D}
            />
            <div className="skupine-shrani-center">
              <input type="submit" className="skupine-shrani" value="shrani" />
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const InputSkupina = ({ skupina, changeHandler, value }) => (
  <div className="inputskupina">
    <div className="inputskupina-header">{`Skupina ${skupina}`}</div>
    <input
      type="text"
      value={value || ""}
      className="inputskupina-input"
      name={skupina}
      id={skupina}
      onChange={e => changeHandler(e.target.value)}
      required
    />
  </div>
);

export default Skupine;
