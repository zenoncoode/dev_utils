// src/components/Header.tsx
import React, { useState } from "react";
import styles from "./Header.module.css";
import { Link } from "react-router-dom";

const links = [
  { label: "Calculadora de IMC", href: "/calculadora-imc" },
  { label: "Conversor YouTube", href: "/conversor-youtube" },
  { label: "Conversor de PDF", href: "/conversor-pdf" },
  { label: "Gerador de Senhas", href: "/gerador-senhas" },
  { label: "Gerador de CPF/CNPJ", href: "/gerador-cpf" },
  { label: "Conversor de Moedas", href: "/conversor-moedas" },
  { label: "Conversor de Unidades", href: "/conversor-unidades" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div>
      <header className={styles.header}>
        <Link to="/" className={styles.title}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={styles.icon}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.232 5.232a6 6 0 11-6.464 6.464m6.464-6.464L21 3m-6.464 6.464L3 21"
            />
          </svg>
          Devs.util
        </Link>

        <button
          className={styles.menuButton}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </header>

      <nav className={`${styles.nav} ${menuOpen ? styles.showMenu : ""}`}>
        {links.map(({ label, href }) => (
          <Link
            key={href}
            to={href}
            className={styles.navLink}
            onClick={() => setMenuOpen(false)}
          >
            {label}
          </Link>
        ))}
      </nav>

      {/* Overlay para fechar ao clicar fora */}
      {menuOpen && (
        <div className={styles.overlay} onClick={() => setMenuOpen(false)} />
      )}
    </div>
  );
}
