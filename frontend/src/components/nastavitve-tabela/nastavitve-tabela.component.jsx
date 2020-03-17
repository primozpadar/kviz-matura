import React from "react";
import "./nastavitve-tabela.styles.scss";

const NastavitveTabela = ({ data }) => {
  const { vprasanja, _id } = data || null;
  return (
    <div>
      {vprasanja.length !== 0 ? (
        <table className="tabela">
          <tbody>
            <tr>
              <th>Vprašanje</th>
              <th>Odgovor A</th>
              <th>Odgovor B</th>
              <th>Odgovor C</th>
              <th>Odgovor D</th>
              {/*TODO- EditVpr - <th className="tabela-edit-header"></th>*/}
            </tr>
            {vprasanja.map(x => (
              <tr key={_id + x.vprasanje}>
                <td>{x.vprasanje}</td>
                <td>{x.odgovori.A}</td>
                <td>{x.odgovori.B}</td>
                <td>{x.odgovori.C}</td>
                <td>{x.odgovori.D}</td>
                {/*TODO- EditVpr - <td className="tabela-edit">
                  <p className="tabela-edit-icon">✎</p>
                </td>*/}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Ni vprašanj...</p>
      )}
    </div>
  );
};

export default NastavitveTabela;
