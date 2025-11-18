chrome.runtime.onMessage.addListener((msg) => {
  if (msg.action === "highlight_now") {
    highlightText();
  }
});

function highlightText() {
  let selection = window.getSelection();

  // check if a certain amount of text is selected or not
  if (!selection.rangeCount) return;
  let range = selection.getRangeAt(0);

  // prevent useless clicks on whitespaces
  let selectedText = selection.toString().trim();
  if (!selectedText) return;

  // create highlighted span
  const span = document.createElement("span");
  span.style.backgroundColor = "yellow";
  span.style.color = "black";
  span.style.borderRadius = "3px";
  span.style.padding = "1";

  try {
    // extract selected content (removes text from dom)
    const extracted = range.extractContents();

    // put extracted text inside span
    span.appendChild(extracted);

    // insert highlighted text in place of original text
    range.insertNode(span);

    // remove the selected view
    selection.removeAllRanges();
  } catch (err) {
    console.log("Error", err);
  }
}
