import React, { useState } from "react";
import Footer from "../../components/Footer.tsx";
import Header from "../../components/Header.tsx";
import styles from "./ConversorUnidades.module.css";

const ConversorUnidades = () => {
  const [valor, setValor] = useState("");
  const [resultado, setResultado] = useState<number | null>(null);
  const [unidadeOrigem, setUnidadeOrigem] = useState<string>("km");
  const [unidadeDestino, setUnidadeDestino] = useState<string>("m");

  const unidades = {
    km: 1000,
    m: 1,
    cm: 0.01,
    mm: 0.001,
  };

  const converter = () => {
    if (valor === "") {
      alert("Por favor, insira um valor.");
      return;
    }

    const valorNumerico = parseFloat(valor);
    if (isNaN(valorNumerico)) {
      alert("Por favor, insira um valor numérico válido.");
      return;
    }

    const resultadoConversao =
      (valorNumerico * unidades[unidadeOrigem]) / unidades[unidadeDestino];

    setResultado(resultadoConversao);
  };

  const handleLimpar = () => {
    setValor("");
    setResultado(null);
    setUnidadeOrigem("km");
    setUnidadeDestino("m");
  };

  return (
    <div>
      <Header />
      <div className={styles.container}>
        <h1 className="text-2xl font-semibold text-center mb-4">
          Conversor de Unidades
        </h1>

        <div className={styles.inputGroup}>
          <label htmlFor="valor" className={styles.label}>
            Valor
          </label>
          <input
            type="text"
            id="valor"
            className={styles.input}
            placeholder="Insira o valor"
            value={valor}
            onChange={(e) => setValor(e.target.value)}
          />
        </div>

        <div className={styles.row}>
          <div className={styles.inputGroup}>
            <label htmlFor="unidadeOrigem" className={styles.label}>
              Unidade de Origem
            </label>
            <select
              id="unidadeOrigem"
              className={styles.select}
              value={unidadeOrigem}
              onChange={(e) => setUnidadeOrigem(e.target.value)}
            >
              {Object.keys(unidades).map((unidade) => (
                <option key={unidade} value={unidade}>
                  {unidade}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="unidadeDestino" className={styles.label}>
              Unidade de Destino
            </label>
            <select
              id="unidadeDestino"
              className={styles.select}
              value={unidadeDestino}
              onChange={(e) => setUnidadeDestino(e.target.value)}
            >
              {Object.keys(unidades).map((unidade) => (
                <option key={unidade} value={unidade}>
                  {unidade}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="text-center mt-4">
          <button className={styles.button} onClick={converter}>
            Converter
          </button>

          <button className={styles.button} onClick={handleLimpar}>
            Limpar
          </button>
        </div>

        {resultado !== null && (
          <div className={styles.result}>
            <p>
              {valor} {unidadeOrigem} = {resultado.toFixed(2)} {unidadeDestino}
            </p>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default ConversorUnidades;
