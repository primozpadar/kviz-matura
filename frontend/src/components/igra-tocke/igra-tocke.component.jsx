import React from "react";
import "./igra-tocke.styles.scss";

const IgraTocke = props => (
  <div className="tocke">
    {props.tockeData.map(({ skupina, tocke }) => (
      <div className="skupina">
        <div className="skupina-ime">{skupina}</div>
        <div className="skupina-tocke">{tocke}</div>
      </div>
    ))}
  </div>
);

export default IgraTocke;
