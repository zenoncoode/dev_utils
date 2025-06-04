// src/components/Footer.tsx
import React from "react";
import styles from "./Footer.module.css"; // Importando o CSS

const links = [
  { label: "Calculadora de IMC", href: "/calculadora-imc" },
  { label: "Conversor YouTube", href: "/conversor-youtube" },
  { label: "Conversor de PDF", href: "/conversor-pdf" },
  { label: "Gerador de Senhas", href: "/gerador-senhas" },
  { label: "Gerador de CPF/CNPJ", href: "/gerador-cpf" },
  { label: "Conversor de Moedas", href: "/conversor-moedas" },
  { label: "Conversor de Unidades", href: "/conversor-unidades" },
];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <p className="mb-4 text-center text-sm text-gray-700 font-medium">
          Outras ferramentas úteis:
        </p>
        <nav>
          {links.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              className={styles.link}
            >
              {label}
            </a>
          ))}
        </nav>

        <section className={styles.copyright}>
          &copy; {new Date().getFullYear()} utils.dev — Todas as ferramentas são
          gratuitas.
        </section>
      </div>
    </footer>
  );
}
