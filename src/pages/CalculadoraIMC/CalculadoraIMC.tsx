import React, { useState } from "react";
import Footer from "../../components/Footer.tsx";
import Header from "../../components/Header.tsx";
import styles from "./CalculadoraIMC.module.css";

const CalculadoraIMC = () => {
  const [peso, setPeso] = useState("");
  const [altura, setAltura] = useState("");
  const [resultado, setResultado] = useState<number | null>(null);

  const converter = () => {
    if (peso === "" || altura === "") {
      alert("Por favor, informe sua altura e peso.");
      return;
    }

    const pesoNumerico = parseFloat(peso);
    if (isNaN(pesoNumerico)) {
      alert("Por favor, insira o peso em kg.");
      return;
    }

    const alturaNumerico = parseFloat(altura);
    if (isNaN(alturaNumerico)) {
      alert("Por favor, insira a altura em cm.");
      return;
    }

    const resultadoConversao = pesoNumerico / ((alturaNumerico / 100) ** 2);
    setResultado(resultadoConversao);
  };

  const handleLimpar = () => {
    setAltura("");
    setPeso("");
    setResultado(null);
  };

  const getClassificacaoIMC = (imc: number) => {
    if (imc < 18.5) {
      return { categoria: "Abaixo do peso", cor: "#bfdbfe" }; // azul claro
    } else if (imc < 24.9) {
      return { categoria: "Peso ideal", cor: "#bbf7d0" }; // verde claro
    } else if (imc < 29.9) {
      return { categoria: "Sobrepeso", cor: "#fecaca" }; // vermelho claro
    } else if (imc < 34.9) {
      return { categoria: "Obesidade Classe I", cor: "#fca5a5" };
    } else if (imc < 39.9) {
      return { categoria: "Obesidade Classe II", cor: "#f87171" };
    } else {
      return { categoria: "Obesidade Classe III", cor: "#ef4444" };
    }
  };

  const calcularFaixaPesoIdeal = (alturaCm: number) => {
    const alturaM = alturaCm / 100;
    const min = 18.5 * (alturaM ** 2);
    const max = 24.9 * (alturaM ** 2);
    return {
      min: min.toFixed(1),
      max: max.toFixed(1)
    };
  };

  return (
    <div>
      <Header />
      <div className={styles.container}>
        <h1 className="text-2xl font-semibold text-center mb-4">
          Calculadora de IMC
        </h1>

        <div className={styles.row}>
          <div className={styles.inputGroup}>
            <label htmlFor="peso" className={styles.label}>
              Peso
            </label>
            <input
              type="text"
              id="peso"
              className={styles.input}
              placeholder="Insira em kg. Ex: 70.5"
              value={peso}
              onChange={(e) => setPeso(e.target.value)}
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="altura" className={styles.label}>
              Altura
            </label>
            <input
              type="text"
              id="altura"
              className={styles.input}
              placeholder="Insira em cm. Ex: 171"
              value={altura}
              onChange={(e) => setAltura(e.target.value)}
            />
          </div>
        </div>

        <div className="text-center mt-4">
          <button className={styles.button} onClick={converter}>
            Calcular
          </button>

          <button className={styles.button} onClick={handleLimpar}>
            Limpar
          </button>
        </div>

        {resultado !== null && (() => {
          const { categoria, cor } = getClassificacaoIMC(resultado);
          const { min, max } = calcularFaixaPesoIdeal(parseFloat(altura));

          return (
            <div
              className={styles.result}
              style={{ backgroundColor: cor }}
            >
              <p>O seu IMC é <strong>{resultado.toFixed(2)}</strong></p>
              <p>Categoria: <strong>{categoria}</strong></p>
              <p>Peso ideal para sua altura: entre <strong>{min} kg</strong> e <strong>{max} kg</strong></p>
            </div>
          );
        })()}
      </div>
      <Footer />
    </div>
  );
};

export default CalculadoraIMC;
