import React from "react";
import "./igra-odgovor.styles.scss";

//svg ikone - kljukica in krizec
import svgPravilno from "../../assets/pravilno.svg";
import svgNapacno from "../../assets/napacno.svg";

const IgraOdgovor = ({ pravilno = "", odgovor, besedilo, enable }) => (
  <div key={odgovor} className="odgovor">
    <div className={`odgovor-container-${pravilno}`}>
      {pravilno === "DA" ? (
        <img src={svgPravilno} alt="" className="svg" />
      ) : pravilno === "NE" ? (
        <img src={svgNapacno} alt="" className="svg" />
      ) : null}
      <div>
        <div className={`odgovor-crka-${pravilno}`}>{odgovor}</div>
      </div>
      {enable ? <div className="odgovor-besedilo">{besedilo}</div> : null}
    </div>
  </div>
);

export default IgraOdgovor;
