import React, { useState, useEffect } from "react";
import Footer from "../../components/Footer.tsx";
import Header from "../../components/Header.tsx";
import styles from "./ConversorMoedas.module.css";

const ConversorMoedas = () => {
  const [valor, setValor] = useState("");
  const [resultado, setResultado] = useState<number | null>(null);
  const [unidadeOrigem, setUnidadeOrigem] = useState<string>("BRL");
  const [unidadeDestino, setUnidadeDestino] = useState<string>("USD");
  const [moedasDisponiveis, setMoedasDisponiveis] = useState<string[]>([]);
  const [taxas, setTaxas] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    // Busca todas as taxas com base em reais brasileiros (BRL)
    fetch("https://open.er-api.com/v6/latest/BRL")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.rates) {
          setMoedasDisponiveis(Object.keys(data.rates));
          setTaxas(data.rates);
        } else {
          console.error("Resposta inesperada da API:", data);
        }
      })
      .catch((err) => console.error("Erro ao buscar moedas:", err));
  }, []);

  const converter = () => {
    if (!valor) {
      alert("Por favor, insira um valor.");
      return;
    }

    const valorNumerico = parseFloat(valor);
    if (isNaN(valorNumerico)) {
      alert("Por favor, insira um valor numérico válido.");
      return;
    }

    const taxaOrigem = taxas[unidadeOrigem];
    const taxaDestino = taxas[unidadeDestino];

    if (!taxaOrigem || !taxaDestino) {
      alert("Erro ao obter taxas de câmbio.");
      return;
    }

    // Conversão considerando USD como base
    const valorBRL = valorNumerico / taxaOrigem;
    const valorConvertido = valorBRL * taxaDestino;

    setResultado(valorConvertido);
  };

  const handleLimpar = () => {
    setValor("");
    setResultado(null);
    setUnidadeOrigem("BRL");
    setUnidadeDestino("USD");
  };

  return (
    <div>
      <Header />
      <div className={styles.container}>
        <h1 className="text-2xl font-semibold text-center mb-4">
          Conversor de Moedas
        </h1>

        <div className={styles.inputGroup}>
          <label htmlFor="valor" className={styles.label}>
            Valor
          </label>
          <input
            type="text"
            id="valor"
            className={styles.input}
            placeholder="Insira o valor. Ex: 145.04"
            value={valor}
            onChange={(e) => setValor(e.target.value)}
          />
        </div>

        <div className={styles.row}>
          <div className={styles.inputGroup}>
            <label htmlFor="unidadeOrigem" className={styles.label}>
              Moeda de Origem
            </label>
            <select
              id="unidadeOrigem"
              className={styles.select}
              value={unidadeOrigem}
              onChange={(e) => setUnidadeOrigem(e.target.value)}
            >
              {moedasDisponiveis.map((moeda) => (
                <option key={moeda} value={moeda}>
                  {moeda}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="unidadeDestino" className={styles.label}>
              Moeda de Destino
            </label>
            <select
              id="unidadeDestino"
              className={styles.select}
              value={unidadeDestino}
              onChange={(e) => setUnidadeDestino(e.target.value)}
            >
              {moedasDisponiveis.map((moeda) => (
                <option key={moeda} value={moeda}>
                  {moeda}
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

export default ConversorMoedas;
