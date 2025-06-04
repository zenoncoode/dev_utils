// src/components/Header.tsx
import React from "react";
import styles from "./Header.module.css"; // Importando o CSS
import {Link} from "react-router-dom"; // Importando Link do react-router-dom

export default function Header() {
  return (
    <header className={styles.header}>
      <Link to="/"><h1 className={styles.title}>Devs.util</h1></Link>
    </header>
  );
}
