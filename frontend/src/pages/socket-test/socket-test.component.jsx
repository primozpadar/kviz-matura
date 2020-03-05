import React, { Component } from "react";
import socketIO from "socket.io-client";

class SocketTest extends Component {
  state = {
    tipkaA: ""
  };

  componentDidMount() {
    const socket = socketIO("http://192.168.1.15:3000");
    socket.on("connect", () => {
      socket.on("test", data => {
        this.setState({ tipkaA: data });
      });
    });
  }

  render() {
    return <div>Tipka: {this.state.tipkaA}</div>;
  }
}

export default SocketTest;
