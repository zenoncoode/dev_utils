// src/global.d.ts
//TypeScript não reconhece automaticamente arquivos .css como módulos válidos, a menos que você declare isso. 
//Para corrigir, basta adicionar um arquivo de declaração de tipos para CSS Modules.
declare module '*.module.css' {
    const classes: { [key: string]: string };
    export default classes;
  }
  