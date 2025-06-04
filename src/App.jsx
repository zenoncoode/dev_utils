import React from "react";
const links = [
  { label: "Calculadora de IMC", href: "/calculadora-imc" },
  { label: "Conversor YouTube", href: "/conversor-youtube" },
  { label: "Conversor de PDF", href: "/conversor-pdf" },
  { label: "Gerador de Senhas", href: "/gerador-senhas" },
  { label: "Gerador de CPF/CNPJ", href: "/gerador-cpf" },
  { label: "Conversor de Moedas", href: "/conversor-moedas" },
  { label: "Conversor de Unidades", href: "/conversor-unidades" },
];

export default function App() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">Conversor Utils</h1>
        <div>
          <nav>
            {links.map(({ label, href }) => (
              <div>
                <a key={href} href={href}>
                  {label}
                </a>
              </div>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
