const PDFDocument = require('pdfkit');
const moment = require('moment');

function gerarPDF(data, res) {
  const doc = new PDFDocument({ margin: 30, size: 'A4' });
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename=relatorio.pdf');
  doc.pipe(res);

  const startX = 30;
  let startY = 50;
  const rowHeight = 20;
  const colWidths = [70, 100, 70, 80, 80, 80, 80];
  const columns = ['Matrícula', 'Nome', 'Data', 'Entrada Manhã', 'Saída Manhã', 'Entrada Tarde', 'Saída Tarde'];

  doc.fontSize(16).text('Relatório de Pontos - Dia Atual', { align: 'center' });

  // Função para desenhar uma célula
  function drawCell(text, x, y, width, height, isHeader = false) {
    doc.rect(x, y, width, height).stroke();

    doc.font(isHeader ? 'Helvetica-Bold' : 'Helvetica')
      .fontSize(10)
      .fillColor('black')
      .text(text, x + 5, y + 5, { width: width - 10, height, align: 'left' });
  }

  // Cabeçalho
  let x = startX;
  columns.forEach(col => {
    drawCell(col, x, startY, colWidths[columns.indexOf(col)], rowHeight, true);
    x += colWidths[columns.indexOf(col)];
  });

  startY += rowHeight;

  // Linhas com dados
  data.forEach(row => {
    x = startX;
    const linha = [
      row.matricula,
      row.nome,
      moment(row.data).format('DD/MM/YYYY'),
      row.entrada_manha || 'PENDENTE',
      row.saida_manha || 'PENDENTE',
      row.entrada_tarde || 'PENDENTE',
      row.saida_tarde || 'PENDENTE'
    ];

    linha.forEach((item, i) => {
      drawCell(item.toString(), x, startY, colWidths[i], rowHeight);
      x += colWidths[i];
    });

    startY += rowHeight;

    // Quebrar página se necessário
    if (startY + rowHeight > doc.page.height - 50) {
      doc.addPage();
      startY = 50;
    }
  });

  doc.end();
}

module.exports = gerarPDF;
