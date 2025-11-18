chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "nodemark-highlight",
    title: "Highlight Using NodeMark",
    contexts: ["selection"],
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "nodemark-highlight") {
    chrome.tabs.sendMessage(tab.id, { action: "highlight_now" });
  }
});

chrome.commands.onCommand.addListener((command) => {
  if (command === "highlight_selection") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { action: "highlight_now" });
    });
  }
});
