browser.action.onClicked.addListener(() => {
  browser.sidebarAction.toggle();
});

browser.storage.local.get("readingList").then((data) => {
  const list = data.readingList;

  if (!list) {
    browser.storage.local.set({ readingList: [] });
  }
});
