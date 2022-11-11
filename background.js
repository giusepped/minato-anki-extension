const extensions = 'https://www.marugoto-online.jp/'

chrome.runtime.onInstalled.addListener(() => {
  chrome.action.setBadgeText({
    text: "OFF",
  });
});

chrome.action.onClicked.addListener(async (tab) => {
  if (tab.url.startsWith(extensions)) {
    function getTitle() {
      return document.title;
    }
    const tabId = tab.id;
    chrome.scripting.executeScript(
      {
        target: { tabId: tabId, allFrames: true },
        func: getTitle,
      },
      (injectionResults) => {
        for (const frameResult of injectionResults)
          console.log('Frame Title: ' + frameResult.result);
      });
  }
});