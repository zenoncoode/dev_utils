// src/components/Header.tsx
import React from "react";
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
  return (
    <div>
      <header className={styles.header}>
        <Link to="/" className={styles.title}>
          <img src="/utils.png" alt="Logo" className={styles.logo} />
          Devs.util
        </Link>
      </header>
      <nav className={styles.nav}>
        {links.map(({ label, href }) => (
          <Link key={href} to={href} className={styles.navLink}>
            {label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
