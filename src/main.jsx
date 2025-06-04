import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App.jsx'
import './index.css'

// Páginas utilitárias
import ConversorUnidades from './pages/ConversorUnidades/ConversorUnidades.tsx'
import ConversorMoedas from './pages/ConversorMoedas/ConversorMoedas.tsx'
import GeradorSenhas from './pages/GeradorSenhas/GeradorSenhas.tsx'
import GeradorCPF from './pages/GeradorCPF/GeradorCPF.tsx'
import ConversorPDF from './pages/ConversorPDF/ConversorPDF.tsx'
import CalculadoraIMC from './pages/CalculadoraIMC/CalculadoraIMC.tsx'
import ConversorYouTube from './pages/ConversorYouTube/ConversorYouTube.tsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/conversor-unidades" element={<ConversorUnidades />} />
        <Route path="/conversor-moedas" element={<ConversorMoedas />} />
        <Route path="/gerador-senhas" element={<GeradorSenhas />} />
        <Route path="/gerador-cpf" element={<GeradorCPF />} />
        <Route path="/conversor-pdf" element={<ConversorPDF />} />
        <Route path="/conversor-youtube" element={<ConversorYouTube />} />
        <Route path="/calculadora-imc" element={<CalculadoraIMC />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
