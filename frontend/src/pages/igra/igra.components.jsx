import React, { Component } from "react";
import socketIO from "socket.io-client";
import IgraGumb from "../../components/igra-gumb/igra-gumb.component";

import "./igra.styles.scss";

class Igra extends Component {
  componentDidMount() {
    const socket = socketIO("http://192.168.43.73:3000");
    socket.on("connect", () => {
      console.log("socket");
    });
  }

  render() {
    return (
      <div>
        <div>Igra</div>
        <IgraGumb ime="A" />
        <IgraGumb ime="B" />
        <IgraGumb ime="C" />
        <IgraGumb ime="D" />
      </div>
    );
  }
}

export default Igra;
