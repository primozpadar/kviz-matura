import React from "react";
import "./igra-tocke.styles.scss";

const IgraTocke = ({ ime, tocke }) => (
  <div className="tocke">
    <div className="skupina">
      <div className="skupina-ime">{ime.A}</div>
      <div className="skupina-tocke">{tocke.A}</div>
    </div>
    <div className="skupina">
      <div className="skupina-ime">{ime.B}</div>
      <div className="skupina-tocke">{tocke.B}</div>
    </div>
    <div className="skupina">
      <div className="skupina-ime">{ime.C}</div>
      <div className="skupina-tocke">{tocke.C}</div>
    </div>
    <div className="skupina">
      <div className="skupina-ime">{ime.D}</div>
      <div className="skupina-tocke">{tocke.D}</div>
    </div>
  </div>
);

export default IgraTocke;
