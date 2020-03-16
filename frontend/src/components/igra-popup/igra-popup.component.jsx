import React from "react";
import "./igra-popup.styles.scss";

const IgraPopup = props => (
  <div>
    {props.enable ? (
      <div className="igra-popup">
        <div className="card">
          <p>Konec igre!</p>
        </div>
      </div>
    ) : null}
  </div>
);

export default IgraPopup;
