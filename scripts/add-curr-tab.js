import { getReadingListStorage } from "./lib.js";
import { renderReadingList } from "./sidebar.js";

const btnAddCurrTab = document.getElementById("add-curr-tab");

function addPageToList(tab) {
  getReadingListStorage().then((list) => {
    const isExists = list.find((savedPage) => savedPage.link === tab.url);

    if (!isExists) {
      const itemId = list.length + 1;

      const newItem = {
        id: itemId,
        title: tab.title,
        link: tab.url,
        faviconUrl: tab.favIconUrl,
        status: "unread",
        doneUndoneId: `done-${itemId}`,
        deleteId: `delete-${itemId}`,
      };

      const updatedList = [newItem, ...list];
      browser.storage.local.set({ readingList: updatedList });

      renderReadingList();
    }
  });
}

btnAddCurrTab.addEventListener("click", () => {
  browser.tabs.query({ currentWindow: true, active: true }, (tabs) => {
    const currentTab = tabs[0];

    if (currentTab) {
      addPageToList(currentTab);
    }
  });
});
