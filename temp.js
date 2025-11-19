document.getElementById("exportBtn").onclick = () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(
      tabs[0].id,
      { action: "GET_HIGHLIGHTS" },
      (response) => {
        if (!response) {
          return;
        }

        exportPDF(response.highlights);
      }
    );
  });
};

function exportPDF(highlights) {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text("NodeMark Highlights", 10, 15);

  doc.setFontSize(12);

  let y = 30;
  const lineHeight = 8;
  const maxWidth = 180;

  highlights.forEach((h, idx) => {
    const wrapped = doc.splitTextToSize(`- ${h}`, maxWidth);

    wrapped.forEach((line) => {
      if (y > 280) {
        doc.addPage();
        y = 20;
      }
      doc.text(line, 10, y);
      y += lineHeight;
    });

    y += 2;
  });

  doc.save("NodeMark-Highlights.pdf");
}
