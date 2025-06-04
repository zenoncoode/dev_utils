import React, { useState } from "react";
import Footer from "../../components/Footer.tsx";
import Header from "../../components/Header.tsx";
import styles from "./GeradorCPF.module.css";

const GeradorCPF = () => {
  const [documento, setDocumento] = useState("");
  const [usarPontuacao, setUsarPontuacao] = useState(true);
  const [tipoDocumento, setTipoDocumento] = useState("CPF"); // CPF ou CNPJ
  const [copiado, setCopiado] = useState(false);

  const gerarCPF = () => {
    const n = Array.from({ length: 9 }, () => Math.floor(Math.random() * 10));
    const d1 =
      (n[0] * 10 +
        n[1] * 9 +
        n[2] * 8 +
        n[3] * 7 +
        n[4] * 6 +
        n[5] * 5 +
        n[6] * 4 +
        n[7] * 3 +
        n[8] * 2) %
      11;
    const dig1 = d1 < 2 ? 0 : 11 - d1;

    const d2 =
      (n[0] * 11 +
        n[1] * 10 +
        n[2] * 9 +
        n[3] * 8 +
        n[4] * 7 +
        n[5] * 6 +
        n[6] * 5 +
        n[7] * 4 +
        n[8] * 3 +
        dig1 * 2) %
      11;
    const dig2 = d2 < 2 ? 0 : 11 - d2;

    const cpfNumerico = [...n, dig1, dig2].join("");

    if (usarPontuacao) {
      return `${cpfNumerico.slice(0, 3)}.${cpfNumerico.slice(
        3,
        6
      )}.${cpfNumerico.slice(6, 9)}-${cpfNumerico.slice(9)}`;
    } else {
      return cpfNumerico;
    }
  };

  const gerarCNPJ = () => {
    const n = Array.from({ length: 8 }, () => Math.floor(Math.random() * 10));
    const base = [...n, 0, 0, 0, 1];

    const pesos1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    const d1 = base.reduce((acc, digit, i) => acc + digit * pesos1[i], 0) % 11;
    const dig1 = d1 < 2 ? 0 : 11 - d1;

    const pesos2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    const d2 =
      [...base, dig1].reduce((acc, digit, i) => acc + digit * pesos2[i], 0) %
      11;
    const dig2 = d2 < 2 ? 0 : 11 - d2;

    const cnpjNumerico = [...base, dig1, dig2].join("");

    if (usarPontuacao) {
      return `${cnpjNumerico.slice(0, 2)}.${cnpjNumerico.slice(
        2,
        5
      )}.${cnpjNumerico.slice(5, 8)}/${cnpjNumerico.slice(
        8,
        12
      )}-${cnpjNumerico.slice(12)}`;
    } else {
      return cnpjNumerico;
    }
  };

  const gerarDocumento = () => {
    const novoDoc = tipoDocumento === "CPF" ? gerarCPF() : gerarCNPJ();
    setDocumento(novoDoc);
    setCopiado(false);
  };

  const handleLimpar = () => {
    setDocumento("");
    setCopiado(false);
  };

  const copiarDocumento = () => {
    navigator.clipboard.writeText(documento).then(() => {
      setCopiado(true);
      setTimeout(() => setCopiado(false), 3000);
    });
  };

  return (
    <div>
      <Header />
      <div className={styles.container}>
        <h1 className="text-2xl font-semibold text-center mb-4">
          Gerador de CPF/CNPJ
        </h1>

        <div className={styles.row}>
          <div className={styles.inputGroup}>
            <label htmlFor="documento" className={styles.label}>
              {tipoDocumento}
            </label>
            <input
              type="text"
              id="documento"
              className={styles.input}
              value={documento}
              disabled
            />
            {documento && (
              <button className={styles.button} onClick={copiarDocumento}>
                Copiar
              </button>
            )}
            {copiado && (
              <p className="text-green-600 mt-1">Copiado com sucesso!</p>
            )}
          </div>
        </div>
        

    
        <div className="flex-col ml-4 mb-4">
            <label htmlFor="tipo" className={styles.label}> Tipo </label>
            <select
              id="tipo"
              value={tipoDocumento}
              onChange={(e) => setTipoDocumento(e.target.value)}
              className={styles.input}
            >
              <option value="CPF">CPF</option>
              <option value="CNPJ">CNPJ</option>
            </select>
        </div> 

        <div className={styles.row}>
          <div className="flex-col">
            <input
              type="checkbox"
              id="pontuacao"
              checked={usarPontuacao}
              onChange={() => setUsarPontuacao(!usarPontuacao)}
            />
            <label htmlFor="pontuacao"> Utilizar pontuação</label>
          </div>
        </div>

        <div className="text-center mt-4">
          <button className={styles.button} onClick={gerarDocumento}>
            Gerar {tipoDocumento}
          </button>
          <button className={styles.button} onClick={handleLimpar}>
            Limpar
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default GeradorCPF;
