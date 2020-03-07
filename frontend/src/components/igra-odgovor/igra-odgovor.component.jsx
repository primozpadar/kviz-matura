import React from "react";
import "./igra-odgovor.styles.scss";

const IgraOdgovor = props => (
  <div className="odgovor">
    <div className="odgovor-container">
      <div>
        <div className="odgovor-crka">{props.odgovor}</div>
      </div>
      <div className="odgovor-besedilo">{props.besedilo}</div>
    </div>
  </div>
);

export default IgraOdgovor;
