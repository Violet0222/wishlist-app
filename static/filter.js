function filter() {
  const filter_select = document.getElementById("filterSelect");

  filter_select.addEventListener("change", () => {
    const filterValue = filter_select.value;

    const items = Array.from(document.querySelectorAll(".wishlist-row")).filter(
      (row) => !row.classList.contains("wishlist-header")
    );

    items.forEach((item) => {
      const status =
        item.querySelector(".status-label")?.textContent.trim() || "";
      const priority =
        item
          .querySelector('[id^="value-priority-"]')
          ?.textContent.trim()
          .toLowerCase() || "";
      const isPrivate = item.dataset.private || "0";
      let shouldShow = true;
      if (filterValue === "reserved" && status !== "1") {
        shouldShow = false;
      } else if (filterValue === "not-reserved" && status === "1") {
        shouldShow = false;
      } else if (filterValue === "priority-low" && priority !== "low") {
        shouldShow = false;
      } else if (filterValue === "priority-medium" && priority !== "medium") {
        shouldShow = false;
      } else if (filterValue === "priority-high" && priority !== "high") {
        shouldShow = false;
      } else if (filterValue === "private" && isPrivate !== "1") {
        shouldShow = false;
      } else if (filterValue === "not-private" && isPrivate === "1") {
        shouldShow = false;
      }
      item.style.display = shouldShow ? "" : "none";
    });
  });
}

document.addEventListener("DOMContentLoaded", filter);
