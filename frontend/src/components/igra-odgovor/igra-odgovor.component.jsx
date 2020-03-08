import React from "react";
import "./igra-odgovor.styles.scss";

const IgraOdgovor = ({ pravilno, odgovor, besedilo, enable }) => (
  <div className="odgovor">
    {pravilno.toUpperCase() === "DA" ? (
      <div className="odgovor-container-pravilno">
        <div>
          <div className="odgovor-crka-pravilno">{odgovor}</div>
        </div>
        {enable ? <div className="odgovor-besedilo">{besedilo}</div> : null}
      </div>
    ) : pravilno.toUpperCase() === "NE" ? (
      <div className="odgovor-container-napacno">
        <div>
          <div className="odgovor-crka-napacno">{odgovor}</div>
        </div>
        {enable ? <div className="odgovor-besedilo">{besedilo}</div> : null}
      </div>
    ) : (
      <div className="odgovor-container">
        <div>
          <div className="odgovor-crka">{odgovor}</div>
        </div>
        {enable ? <div className="odgovor-besedilo">{besedilo}</div> : null}
      </div>
    )}
  </div>
);

export default IgraOdgovor;
