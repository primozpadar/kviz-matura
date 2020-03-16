import React from "react";
import "./igra-vprasanje.styles.scss";

const IgraVprasanje = ({ vprasanje }) => (
  <div className="vprasanje">
    <div className="vprasanje-card">{vprasanje}</div>
  </div>
);

export default IgraVprasanje;
