// src/components/Header.tsx
import React from "react";
import styles from "./Header.module.css"; // Importando o CSS

export default function Header() {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>Devs.util</h1>
    </header>
  );
}
