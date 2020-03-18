import React from "react";

import "./homepage-kategorija.styles.scss";

const HomepageKategorija = ({ kategorije, selectedId }) => {
  return (
    <div className="homepage-kategorija">
      <div className="homepage-kategorija-container">
        <div className="homepage-kategorija-header">Izberi kategorijo</div>
        <div className="kategorije-container">
          {kategorije.map(({ kategorija, _id }) => {
            const stanje =
              _id === selectedId
                ? "kategorija kategorija-selected"
                : "kategorija";
            return (
              <div className={stanje} key={_id}>
                {kategorija}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HomepageKategorija;
