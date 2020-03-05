import React from "react";
import "./homepage.styles.scss";
import { Link } from "react-router-dom";

const Homepage = () => (
  <div className="homepage">
    <div className="center-container">
      <LinkGumb path="/igra" text="START" />
      <LinkGumb path="/nastavitve" text="Nastavitve" />
    </div>
  </div>
);

const LinkGumb = props => (
  <Link to={props.path}>
    <input type="button" value={props.text} className="button" />
  </Link>
);

export default Homepage;
