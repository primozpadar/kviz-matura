import React from "react";
import socketIO from "socket.io-client";
import "./homepage.styles.scss";
import { Link } from "react-router-dom";

class Homepage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    const socket = socketIO("http://192.168.4.1:3000");
    socket.on("connect", () => {
      socket.emit("homepage");
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
          <div>
            <LinkGumb text="START" id="igra" />
            <LinkGumb path="/nastavitve" text="Nastavitve" id="nastavitve" />
          </div>
        </div>
      </div>
    );
  }
}

const LinkGumb = ({ path, text }) => (
  <div>
    {path ? (
      <Link to={path}>
        <input type="button" value={text} className="gumb" />
      </Link>
    ) : (
      <input type="button" value={text} className="gumb" />
    )}
  </div>
);

export default Homepage;
