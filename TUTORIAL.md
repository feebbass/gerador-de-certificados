# **Tutorial: Como Configurar e Usar o Script de Geração de Certificados**

## 📌 **1. Introdução**
Este tutorial explica como configurar e executar o script de **Geração de Certificados** usando **Google Apps Script**. O script automatiza a criação de certificados a partir de dados do **Google Sheets** e modelos armazenados no **Google Drive**.

---

## ⚙️ **2. Configuração Inicial**

### **2.1 Criando a Planilha do Google Sheets**
1. Acesse o [Google Sheets](https://docs.google.com/spreadsheets/).
2. Crie uma nova planilha.
3. Configure as colunas conforme o exemplo abaixo:

| NOME | DATA | CURSO |
|------|------|-------|
| João Silva | 10/03/2025 | NR-12 |
| Maria Souza | 12/03/2025 | NR-35 |

4. Copie o **ID da planilha**, que fica na URL:
   - Exemplo de URL: `https://docs.google.com/spreadsheets/d/SEU_ID_AQUI/edit`
   - O **SEU_ID_AQUI** é o ID que será usado no script.

---

### **2.2 Criando os Modelos de Certificados**
1. Acesse o [Google Docs](https://docs.google.com/document/) ou [Google Slides](https://docs.google.com/presentation/).
2. Crie um modelo com **placeholders** que serão substituídos pelos dados.
   - Exemplo de placeholders no documento:
     ```
     Certificamos que {NOME} concluiu o curso {CURSO} em {DATA}.
     ```
3. Copie o **ID do modelo**, que fica na URL do documento.

---

### **2.3 Criando a Pasta de Destino no Google Drive**
1. Acesse o [Google Drive](https://drive.google.com/).
2. Crie uma pasta onde os certificados serão salvos.
3. Copie o **ID da pasta**, que fica na URL.

---

## 🚀 **3. Configuração do Script**

### **3.1 Criando o Projeto no Google Apps Script**
1. Acesse [Google Apps Script](https://script.google.com/).
2. Crie um novo projeto.
3. Copie e cole o código do script no editor.

### **3.2 Editando as Configurações**
1. No código, localize as variáveis de configuração:
   ```javascript
   var planilhaId = "SEU_ID_AQUI";
   var pastaSaidaId = "ID_DA_PASTA";
   var modelos = {
       "Certificado_Modelo": "ID_DO_MODELO"
   };
   ```
2. Substitua pelos IDs copiados anteriormente.

---

## ▶️ **4. Executando o Script**
1. No Google Apps Script, clique em `Executar`.
2. Escolha a função `gerarCertificados()`.
3. Autorize as permissões quando solicitado.
4. O script irá gerar os certificados e salvá-los no Google Drive!

---

## 🎯 **5. Personalizações e Melhorias**
- Você pode adicionar mais placeholders na planilha e nos modelos.
- Para melhorar a automação, configure um **gatilho** para executar o script automaticamente.

Se tiver dúvidas ou sugestões, entre em contato via **Issues** no repositório! 🚀

