import React, { useState } from "react";
import Footer from "../../components/Footer.tsx";
import Header from "../../components/Header.tsx";
import styles from "./GeradorSenhas.module.css";

const GeradorSenhas = () => {
  const [senha, setSenha] = useState("");
  const [copiado, setCopiado] = useState(false);

  const [usarNumeros, setUsarNumeros] = useState(true);
  const [usarLetras, setUsarLetras] = useState(true);
  const [usarSimbolos, setUsarSimbolos] = useState(true);
  const [numeroCaracteres, setNumeroCaracteres] = useState(8);

  const gerarSenha = () => {
    let caracteres = "";

    if (usarNumeros) caracteres += "0123456789";
    if (usarLetras) caracteres += "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (usarSimbolos) caracteres += "!@#$%^&*()_+[]{}|;:,.<>?";

    if (caracteres.length === 0) {
      alert("Selecione ao menos um tipo de caractere para gerar a senha.");
      return;
    }

    if (numeroCaracteres < 4) {
      alert("A senha deve ter no mínimo 4 caracteres.");
      return;
    }

    let senhaGerada = "";
    for (let i = 0; i < numeroCaracteres; i++) {
      const index = Math.floor(Math.random() * caracteres.length);
      senhaGerada += caracteres[index];
    }

    setSenha(senhaGerada);
    setCopiado(false); // Reseta mensagem de cópia se gerar nova senha
  };

  const handleLimpar = () => {
    setSenha("");
    setCopiado(false);
  };

  const copiarSenha = () => {
    navigator.clipboard.writeText(senha).then(() => {
      setCopiado(true);
      setTimeout(() => setCopiado(false), 3000); // Remove confirmação após 3 segundos
    });
  };

  return (
    <div>
      <Header />
      <div className={styles.container}>
        <h1 className="text-2xl font-semibold text-center mb-4">Gerador de Senhas</h1>

        <div className={styles.row}>
          <div className={styles.inputGroup}>
            <label htmlFor="senha" className={styles.label}>
              Senha
            </label>
            <input
              type="text"
              id="senha"
              className={styles.input}
              value={senha}
              disabled
            />
            {senha && (
              <button className={styles.button} onClick={copiarSenha}>
                Copiar
              </button>
            )}
            {copiado && <p className="text-green-600 mt-1">Senha copiada!</p>}
          </div>
        </div>

        <div className={styles.row}>
          <div className="flex-col">
            <input
              type="checkbox"
              id="senhaNumerica"
              checked={usarNumeros}
              onChange={() => setUsarNumeros(!usarNumeros)}
            />
            <label htmlFor="senhaNumerica"> Adicionar números</label>
            <br />
          </div>

          <div className="flex-col">
            <input
              type="checkbox"
              id="senhaAlfanumerica"
              checked={usarLetras}
              onChange={() => setUsarLetras(!usarLetras)}
            />
            <label htmlFor="senhaAlfanumerica"> Adicionar letras</label>
            <br />
          </div>

          <div className="flex-col">
            <input
              type="checkbox"
              id="senhaSimbolos"
              checked={usarSimbolos}
              onChange={() => setUsarSimbolos(!usarSimbolos)}
            />
            <label htmlFor="senhaSimbolos"> Adicionar símbolos</label>
            <br />
          </div>

          <div className="flex-col">
            <label htmlFor="numeroCaracteres" className={styles.label}>
              Número de caracteres
            </label>
            <input
              type="number"
              id="numeroCaracteres"
              className={styles.input}
              min={4}
              value={numeroCaracteres}
              onChange={(e) => {
                const valor = Math.max(4, Number(e.target.value));
                setNumeroCaracteres(valor);
              }}
            />
          </div>
        </div>

        <div className="text-center mt-4">
          <button className={styles.button} onClick={gerarSenha}>
            Gerar senha
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

export default GeradorSenhas;
