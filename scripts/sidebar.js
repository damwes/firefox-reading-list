import "./add-curr-tab.js";

import { getReadingListStorage } from "./lib.js";
import { setInitialState } from "./accordions.js";
import {
  renderItemList,
  handleClickDoneUndone,
  handleClickDelete,
} from "./item-list.js";

export async function renderReadingList() {
  const list = await getReadingListStorage();
  const isEmpty = list.length === 0;

  let htmlReadItems = ``;
  let htmlUnreadItems = ``;

  for (const item of list) {
    if (item.status === "unread") {
      htmlUnreadItems += renderItemList(item);
    }

    if (item.status === "read") {
      htmlReadItems += renderItemList(item);
    }
  }

  document.getElementById("unread").innerHTML = htmlUnreadItems;
  document.getElementById("read").innerHTML = htmlReadItems;

  for (const item of list) {
    document.getElementById(item.doneUndoneId).addEventListener("click", () => {
      handleClickDoneUndone(item.id);
    });

    document.getElementById(item.deleteId).addEventListener("click", () => {
      handleClickDelete(item.id);
    });
  }

  if (!isEmpty) {
    setInitialState();
  }
}

renderReadingList();
