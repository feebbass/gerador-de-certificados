function gerarCertificados() {
  // Substitua pelo ID da sua planilha do Google Sheets
  var planilhaId = "SUA_PLANILHA_ID_AQUI";
  var sheet = SpreadsheetApp.openById(planilhaId).getSheetByName("NOME_DA_PLANILHA");
  var dados = sheet.getDataRange().getValues();
  var cabecalho = dados[0];

  // Substitua pelos IDs dos seus templates no Google Drive
  var modelos = {
    "NOME_DO_MODELO_1": "ID_DO_ARQUIVO_1",
    "NOME_DO_MODELO_2": "ID_DO_ARQUIVO_2",
    // Adicione mais modelos conforme necessário
  };

  // Substitua pelo ID da pasta onde os certificados serão salvos
  var pastaSaidaId = "ID_DA_PASTA_SAIDA";
  var pastaSaida = DriveApp.getFolderById(pastaSaidaId);

  for (var i = 1; i < dados.length; i++) {
    var linha = dados[i];
    var nomeFuncionario = linha[cabecalho.indexOf("NOME")].replace(/ /g, "_");
    var pastaFuncionario = obterOuCriarPasta(pastaSaida, nomeFuncionario);

    var placeholders = {};
    for (var j = 0; j < cabecalho.length; j++) {
      var chave = "{" + cabecalho[j] + "}";
      placeholders[chave] = formatarData(linha[j]);
    }

    for (var modelo in modelos) {
      var templateId = modelos[modelo];
      var nomeArquivo = modelo + "_" + nomeFuncionario;

      try {
        var tipoArquivo = DriveApp.getFileById(templateId).getMimeType();
        
        if (tipoArquivo.includes("presentation")) {
          gerarCertificadoSlides(templateId, pastaFuncionario, nomeArquivo, placeholders);
        } else {
          gerarCertificadoDocs(templateId, pastaFuncionario, nomeArquivo, placeholders);
        }

      } catch (e) {
        Logger.log("Erro ao processar o modelo " + modelo + ": " + e.message);
      }
    }
  }
  SpreadsheetApp.getUi().alert("Certificados gerados com sucesso!");
}

// Função para formatar data corretamente (sem hora)
function formatarData(valor) {
  if (valor instanceof Date) {
    return Utilities.formatDate(valor, Session.getScriptTimeZone(), "dd/MM/yyyy");
  }
  return valor ? valor : "Não informado";
}

// Função para criar ou obter uma pasta específica
function obterOuCriarPasta(pastaRaiz, nomePasta) {
  var pastas = pastaRaiz.getFoldersByName(nomePasta);
  return pastas.hasNext() ? pastas.next() : pastaRaiz.createFolder(nomePasta);
}

// Função para gerar certificados a partir de arquivos Google Docs
function gerarCertificadoDocs(templateId, pastaFuncionario, nomeArquivo, placeholders) {
  var novoDoc = DriveApp.getFileById(templateId).makeCopy(nomeArquivo, pastaFuncionario);
  var doc = DocumentApp.openById(novoDoc.getId());
  var corpo = doc.getBody();

  for (var chave in placeholders) {
    corpo.replaceText(chave, placeholders[chave]);
  }
  doc.saveAndClose();

  var pdfBlob = DriveApp.getFileById(novoDoc.getId()).getAs("application/pdf");
  pastaFuncionario.createFile(pdfBlob).setName(nomeArquivo + ".pdf");
}

// Função para gerar certificados a partir de arquivos Google Slides
function gerarCertificadoSlides(templateId, pastaFuncionario, nomeArquivo, placeholders) {
  var novoSlide = DriveApp.getFileById(templateId).makeCopy(nomeArquivo, pastaFuncionario);
  var slide = SlidesApp.openById(novoSlide.getId());
  var slides = slide.getSlides();

  for (var i = 0; i < slides.length; i++) {
    var elementos = slides[i].getPageElements();
    for (var j = 0; j < elementos.length; j++) {
      if (elementos[j].asShape) {
        var texto = elementos[j].asShape().getText();
        for (var chave in placeholders) {
          texto.replaceAllText(chave, placeholders[chave]);
        }
      }
    }
  }
  slide.saveAndClose();

  var pdfBlob = DriveApp.getFileById(novoSlide.getId()).getAs("application/pdf");
  pastaFuncionario.createFile(pdfBlob).setName(nomeArquivo + ".pdf");
}
