import React, { useState } from "react";
import Footer from "../../components/Footer.tsx";
import Header from "../../components/Header.tsx";
import styles from "./ConversorYouTube.module.css";

const ConversorYouTube = () => {
  const [valor, setValor] = useState("");
  const [resultado, setResultado] = useState<string | null>(null);

  const [carregando, setCarregando] = useState(false);


  const converter = async () => {
    if (valor.trim() === "") {
      alert("Por favor, insira um link válido.");
      return;
    }

    // Extrai o ID do vídeo do link
    const videoId = valor.split("v=")[1]?.split("&")[0];
    if (!videoId) {
      alert("Link inválido. Verifique se está no formato correto: https://youtube.com/watch?v=ID");
      return;
    }

    setCarregando(true);
    try {
      const url = `https://ytstream-download-youtube-videos.p.rapidapi.com/dl?id=${videoId}`;
      const options = {
        method: "GET",
        headers: {
          "x-rapidapi-key": "c73644ae34mshb8ef0287534ea19p1e6593jsn5ffb849c2dae",
          "x-rapidapi-host": "ytstream-download-youtube-videos.p.rapidapi.com",
        },
      };

      const response = await fetch(url, options);
      const data = await response.json();

      console.log("Resposta da API:", data);

      // Verifique os formatos retornados para encontrar o link
      const link = data.adaptiveFormats?.find(format => format.mimeType.includes("audio/mp4"))?.url;

      if (link) {
        console.log("Link retornado pela API:", link);
        setResultado(link);  // Define o link do MP3 no estado `resultado`
      } else {
        alert("Não foi possível encontrar o link para o áudio.");
      }
    } catch (error) {
      console.error("Erro na conversão:", error);
      alert("Erro ao converter o vídeo.");
    } finally {
      setCarregando(false);
    }
  };

  const handleLimpar = () => {
    setValor("");
    setResultado(null);
    document.getElementById('botaoConverter')!.style.display = 'inline-block'; // Mostrar o botão de converter
    document.getElementById('botaoBaixar')!.style.display = 'none'; // Esconder o botão de baixar
  };

  const baixarArquivo = () => {
    const a = document.createElement('a');
    a.href = resultado!;
    a.download = 'audio.mp3';  // O nome do arquivo que será baixado
    a.style.display = 'none';  // Esconde o link de download
    a.target = '_blank';  // Abre o link em uma nova aba
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);  // Remove o link depois de clicar
  };

  return (
    <div>
      <Header />
      <div className={styles.container}>
        <h1 className="text-2xl font-semibold text-center mb-4">
          Conversor de YouTube para MP3
        </h1>

        <div className={styles.inputGroup}>
          <label htmlFor="valor" className={styles.label}>
            Link do YouTube
          </label>
          <input
            type="text"
            id="valor"
            className={styles.input}
            placeholder="https://youtube.com/watch?v=..."
            value={valor}
            onChange={(e) => setValor(e.target.value)}
          />
        </div>

        <div className="text-center mt-4">
          <button
            id="botaoConverter"
            className={styles.button}
            onClick={converter}
            disabled={carregando}
          >
            {carregando ? "Convertendo..." : "Converter"}
          </button>

          <button
            className={styles.button}
            onClick={handleLimpar}
          >
            Limpar
          </button>
        </div>

        {resultado && (
          <div className="text-center mt-6">
            <button
              id="botaoBaixar"
              className={styles.button}
              onClick={baixarArquivo}
            >
              Abrir Arquivo MP3
            </button>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default ConversorYouTube;
