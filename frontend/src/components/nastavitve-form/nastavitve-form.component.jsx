import React, { useState } from "react";
import "./nastavitve-form.styles.scss";

const VprasanjeForm = ({
  socketSubmit,
  kategorije,
  closeForm,
  izbranaKategorijaId
}) => {
  const [kategorijaId, setKategorijaId] = useState(izbranaKategorijaId);
  const [vprasanje, setVprasanje] = useState(null);
  const [A, setA] = useState(null);
  const [B, setB] = useState(null);
  const [C, setC] = useState(null);
  const [D, setD] = useState(null);
  const [pravilno, setPravilno] = useState(null);

  const handleSubmit = e => {
    e.preventDefault();
    const vprasanjeData = {
      kategorijaId,
      vprasanje,
      odgovori: { A, B, C, D },
      pravilno
    };
    socketSubmit(vprasanjeData);
    closeForm(kategorijaId || izbranaKategorijaId);
  };

  const closeHandler = () => {
    closeForm(null);
  };

  return (
    <div className="nastavitve_form">
      <div className="nastavitve_form-container">
        <button className="zapri" onClick={closeHandler}>
          &times;
        </button>
        <div className="nastavitve_form-header">Dodaj novo vprašanje</div>
        <form onSubmit={handleSubmit}>
          {/* kategorija dropdown */}
          <div className="input-container">
            <label htmlFor="kategorija">kategorija:</label>
            <select
              tabIndex="1"
              onChange={e => setKategorijaId(e.target.value)}
              className="input-kategorija"
              id="kategorija"
              value={kategorijaId || ""}
              required
            >
              <option value="" hidden>
                Izberi kategorijo...
              </option>
              {kategorije
                ? kategorije.map(x => (
                    <option key={x._id} value={x._id}>
                      {x.kategorija}
                    </option>
                  ))
                : null}
            </select>
          </div>
          {/* vprasanje input */}
          <div className="input-container">
            <label htmlFor="vprasanje">vprašanje:</label>
            <input
              tabIndex="2"
              onChange={e => setVprasanje(e.target.value)}
              type="text"
              className="input-vprasanje"
              name="vprasanje"
              required
            />
          </div>
          {/* odgovori input */}
          <div className="input-container-odgovori">
            <InputOdgovor
              radioHandler={() =>
                setPravilno({ A: true, B: false, C: false, D: false })
              }
              inputHandler={e => setA(e.target.value)}
              odgovor="A"
            />
            <InputOdgovor
              radioHandler={() =>
                setPravilno({ A: false, B: true, C: false, D: false })
              }
              inputHandler={e => setB(e.target.value)}
              odgovor="B"
            />
            <InputOdgovor
              radioHandler={() =>
                setPravilno({ A: false, B: false, C: true, D: false })
              }
              inputHandler={e => setC(e.target.value)}
              odgovor="C"
            />
            <InputOdgovor
              radioHandler={() =>
                setPravilno({ A: false, B: false, C: false, D: true })
              }
              inputHandler={e => setD(e.target.value)}
              odgovor="D"
            />
          </div>
          <div className="input-submit-container">
            <input className="input-submit" type="submit" value="Dodaj" />
          </div>
        </form>
      </div>
    </div>
  );
};

const InputOdgovor = ({ odgovor, radioHandler, inputHandler }) => {
  return (
    <div className="input-odgovor">
      <label
        className="input-odgovor-label"
        htmlFor={odgovor}
      >{`odgovor ${odgovor}:`}</label>
      <input
        tabIndex="3"
        onChange={inputHandler}
        className="input-odgovor-input"
        type="text"
        name={odgovor}
        required
      />

      <div className="radio">
        <input
          tabIndex="4"
          onChange={radioHandler}
          id={odgovor}
          name="radio"
          type="radio"
          required
        />
        <label htmlFor={odgovor} className="radio-label"></label>
      </div>
    </div>
  );
};

const KategorijaForm = ({ socketSubmit, closeForm }) => {
  const [kategorija, setKategorija] = useState(null);

  const handleSubmit = e => {
    e.preventDefault();
    socketSubmit(kategorija);
    closeHandler();
  };

  const closeHandler = () => {
    closeForm(null);
  };

  return (
    <div className="nastavitve-form">
      <div className="nastavitve_form">
        <div className="nastavitve_form-container">
          <button className="zapri" onClick={closeHandler}>
            &times;
          </button>
          <div className="nastavitve_form-header">Dodaj novo kategorijo</div>
          <form onSubmit={handleSubmit}>
            <div className="input-container">
              <label htmlFor="kategorija">kategorija:</label>
              <input
                type="text"
                className="input-kategorija-novo"
                name="kategorija"
                onChange={e => setKategorija(e.target.value)}
              />
            </div>
            <div className="input-submit-container">
              <input
                className="input-submit vijolicna"
                type="submit"
                value="Dodaj"
                required
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export { VprasanjeForm, KategorijaForm };
