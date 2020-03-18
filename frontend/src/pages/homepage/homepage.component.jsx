import React from "react";
import socketIO from "socket.io-client";
import "./homepage.styles.scss";
import HomepageKategorija from "../../components/homepage-kategorija/homepage-kategorija.component";

class Homepage extends React.Component {
  constructor(props) {
    super(props);
    this.socket = this.socketInit();
    this.state = {
      showIzberiKategorijo: false,
      kategorije: null,
      izbranaKatIndex: 0
    };
  }

  socketInit() {
    const socket = socketIO("http://192.168.4.1:3000");
    socket.on("connect", () => {
      socket.emit("homepage");
      socket.on("homepage-izberi_kategorijo", kategorije => {
        this.setState({ kategorije, showIzberiKategorijo: true });
        socket.emit(
          "homepage-izbrana_kategorija",
          this.state.kategorije[0]._id
        );
      });
      socket.on("homepage-next_kategorija", () => {
        this.handleNextKategorija();
      });
      socket.on("homepage-start", () => {
        socket.disconnect();
        this.props.history.push("/igra");
      });
    });
    return socket;
  }

  handleNextKategorija = () => {
    if (this.state.izbranaKatIndex >= this.state.kategorije.length - 1) {
      this.setState({ izbranaKatIndex: 0 });
    } else {
      this.setState(prevState => {
        return { izbranaKatIndex: prevState.izbranaKatIndex + 1 };
      });
    }
    this.socket.emit(
      "homepage-izbrana_kategorija",
      this.state.kategorije[this.state.izbranaKatIndex]._id
    );
  };

  openNastavitve = () => {
    this.socket.disconnect();
    this.props.history.push("/nastavitve");
  };

  odpriSkupine = () => {
    this.socket.disconnect();
    this.props.history.push("/skupine");
  };

  render() {
    return (
      <div className="homepage">
        {this.state.showIzberiKategorijo ? (
          <HomepageKategorija
            kategorije={this.state.kategorije}
            selectedId={this.state.kategorije[this.state.izbranaKatIndex]._id}
          />
        ) : null}
        <div className="center-container">
          <input className="gumb-start" type="button" value="START" />
          <input
            className="gumb-nastavitve"
            onClick={this.openNastavitve}
            type="button"
            value="nastavitve"
          />
          <input
            className="gumb-skupine"
            onClick={this.odpriSkupine}
            type="button"
            value="skupine"
          />
        </div>
      </div>
    );
  }
}

export default Homepage;
