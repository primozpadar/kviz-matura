import React, { Component } from "react";
import socketIO from "socket.io-client";

import "./socket-test.styles.scss";

class SocketTest extends Component {
  state = {
    tipkaA: "gumb",
    tipkaB: "gumb",
    tipkaC: "gumb",
    tipkaD: "gumb"
  };

  componentDidMount() {
    const socket = socketIO("http://192.168.43.73:3000");
    socket.on("connect", () => {
      socket.on("test", data => {
        console.log(data);
        switch (data) {
          case "RPI_A":
            this.setState({
              tipkaA: "gumb gumb-active",
              tipkaB: "gumb",
              tipkaC: "gumb",
              tipkaD: "gumb"
            });
            break;
          case "RPI_B":
            this.setState({
              tipkaA: "gumb",
              tipkaB: "gumb gumb-active",
              tipkaC: "gumb",
              tipkaD: "gumb"
            });
            break;
          case "RPI_C":
            this.setState({
              tipkaA: "gumb",
              tipkaB: "gumb",
              tipkaC: "gumb gumb-active",
              tipkaD: "gumb"
            });
            break;
          case "RPI_D":
            this.setState({
              tipkaA: "gumb",
              tipkaB: "gumb",
              tipkaC: "gumb",
              tipkaD: "gumb gumb-active"
            });
            break;
          default:
            break;
        }
      });
    });
  }

  render() {
    return (
      <div className="gumb-wrap">
        <div className={this.state.tipkaA}>A</div>
        <div className={this.state.tipkaB}>B</div>
        <div className={this.state.tipkaC}>C</div>
        <div className={this.state.tipkaD}>D</div>
      </div>
    );
  }
}

export default SocketTest;
