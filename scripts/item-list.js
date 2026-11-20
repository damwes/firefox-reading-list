import { renderReadingList } from "./sidebar.js";
import { getReadingListStorage } from "./lib.js";

export function renderItemList({
  title,
  faviconUrl,
  link,
  status,
  doneUndoneId,
  deleteId,
}) {
  const clearLink = link.replace(/https?:\/\//, "");
  const doneUndoneStatus = status === "unread" ? "done" : "undone";

  return `
  <div class="site-box">
    <a class="site-header" href="${link}" target="_blank">
      <div class="site-favicon">
        <img src="${faviconUrl}" />
      </div>

      <div class="site-heading">
        <span class="site-title" title="${title}">${title}</span>
        <span class="site-link">${clearLink}</span>
      </div>
    </a>

    <div class="site-actions">
      <button id="${doneUndoneId}">
        <img src="./assets/icons/${doneUndoneStatus}.svg" alt="Done Icon" />
      </button>

      <button id="${deleteId}">
        <img src="./assets/icons/delete.svg" alt="Delete Icon" />
      </button>
    </div>
  </div>`;
}

export async function handleClickDoneUndone(id) {
  const list = await getReadingListStorage();

  const updatedList = list.map((savedPage) => {
    if (savedPage.id === id) {
      const status = savedPage.status === "unread" ? "read" : "unread";
      return { ...savedPage, status };
    }

    return savedPage;
  });

  browser.storage.local.set({ readingList: updatedList });

  renderReadingList();
}

export async function handleClickDelete(id) {
  const list = await getReadingListStorage();
  const updatedList = list.filter((savedPage) => savedPage.id !== id);

  browser.storage.local.set({ readingList: updatedList });

  renderReadingList();
}
