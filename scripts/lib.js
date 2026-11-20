export async function getReadingListStorage() {
  const raw = await browser.storage.local.get("readingList");
  const list = raw.readingList ?? [];

  return list.map((item) => {
    const isUnread = item.status === "unread";

    item.doneUndoneId = isUnread ? `done-${item.id}` : `undone-${item.id}`;
    item.deleteId = `delete-${item.id}`;

    return item;
  });
}
