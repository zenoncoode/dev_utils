import React, { useState } from "react";
import Footer from "../../components/Footer.tsx";
import Header from "../../components/Header.tsx";
import styles from "./ConversorPDF.module.css";

const ConversorPDF = () => {
  const [file, setFile] = useState<File | null>(null);
  const [unidadeOrigem, setUnidadeOrigem] = useState<string>("DOCX");
  const [unidadeDestino, setUnidadeDestino] = useState<string>("PDF");
  const [carregando, setCarregando] = useState(false);

  const tiposSuportados: Record<string, string[]> = {
    DOCX: ["PDF"],
    PDF: ["DOCX"],
    PNG: ["PDF", "SVG", "JPG"],
    JPG: ["PDF", "PNG"],
    XLSX: ["PDF"]
  };

  const b64toBlob = (b64Data: string, contentType = '', sliceSize = 512) => {
    const byteCharacters = atob(b64Data);
    const byteArrays: Uint8Array[] = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    return new Blob(byteArrays, { type: contentType });
  };

  const converter = async () => {
    if (!file) {
      alert("Por favor, selecione um arquivo.");
      return;
    }
    
    setCarregando(true);
    
    const formData = new FormData();
    formData.append("File", file);

    try {
      const response = await fetch(
        `https://v2.convertapi.com/convert/${unidadeOrigem.toLowerCase()}/to/${unidadeDestino.toLowerCase()}?auth=secret_ejBoXbEesOtAxxbs`,
        {
          method: "POST",
          body: formData
        }
      );

      const data = await response.json();

      if (!data || !data.Files || !data.Files[0]) {
        alert("Erro na conversão. Verifique o tipo de arquivo.");
        return;
      }

      const fileData = data.Files[0];
      const blob = b64toBlob(fileData.FileData, `application/${unidadeDestino.toLowerCase()}`);
      const downloadUrl = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = fileData.FileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      console.error("Erro na conversão:", error);
      alert("Erro ao converter arquivo.");
    } finally {
      setCarregando(false);
    }
  };


  return (
    <div>
      <Header />
      <div className={styles.container}>
        <h1 className="text-2xl font-semibold text-center mb-4">
          Conversor de Arquivos
        </h1>

        <div className={styles.inputGroup}>
          <label htmlFor="valor" className={styles.label}>
            Anexe o arquivo
          </label>
          <input
            type="file"
            id="valor"
            className={styles.input}
            accept=".docx,.pdf,.png,.jpg,.xlsx"
            onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
          />
        </div>

        <div className={styles.row}>
          <div className={styles.inputGroup}>
            <label htmlFor="unidadeOrigem" className={styles.label}>
              Extensão de Origem
            </label>
            <select
              id="unidadeOrigem"
              className={styles.select}
              value={unidadeOrigem}
              onChange={(e) => {
                const origem = e.target.value;
                setUnidadeOrigem(origem);
                setUnidadeDestino(tiposSuportados[origem][0]);
              }}
            >
              {Object.keys(tiposSuportados).map((tipo) => (
                <option key={tipo} value={tipo}>
                  {tipo}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="unidadeDestino" className={styles.label}>
              Extensão de Destino
            </label>
            <select
              id="unidadeDestino"
              className={styles.select}
              value={unidadeDestino}
              onChange={(e) => setUnidadeDestino(e.target.value)}
            >
              {tiposSuportados[unidadeOrigem].map((tipo) => (
                <option key={tipo} value={tipo}>
                  {tipo}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="text-center mt-4">
        <button className={styles.button} onClick={converter} disabled={carregando}>
            {carregando ? "Convertendo..." : "Converter"}
          </button>

        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ConversorPDF;
