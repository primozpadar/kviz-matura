import React from "react";
import socketIO from "socket.io-client";
import "./homepage.styles.scss";
import { Link } from "react-router-dom";

class Homepage extends React.Component {
  componentWillMount() {
    const socket = socketIO("http://192.168.4.1:3000");
    socket.on("connect", () => {
      socket.emit("homepage", { data: "testtest" });
      socket.on("homepage-start", () => {
        this.props.history.push("/igra");
        socket.disconnect();
      });
    });
  }

  render() {
    return (
      <div className="homepage">
        <div className="center-container">
          <LinkGumb path="/igra" text="START" id="igra" />
          <LinkGumb path="/nastavitve" text="Nastavitve" id="nastavitve" />
        </div>
      </div>
    );
  }
}

const LinkGumb = props => (
  <Link to={props.path}>
    <input type="button" value={props.text} className="button" />
  </Link>
);

export default Homepage;
