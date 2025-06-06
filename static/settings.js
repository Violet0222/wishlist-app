function settings() {
  const setCursorToEnd = (input) => {
    const length = input.value.length;
    input.setSelectionRange(length, length);
  };

  const editableFields = document.querySelectorAll(".editable-field");

  editableFields.forEach((field) => {
    const valueDisplay = field.querySelector(".value-display");
    const form = field.querySelector("form");

    if (!valueDisplay || !form) return;

    const input = form.querySelector("input, select");
    if (!input) return;

    field.addEventListener("click", (event) => {
      if (field.contains(event.target) && event.target.tagName !== "SPAN")
        return;
      valueDisplay.hidden = true;
      form.classList.remove("hidden");
      input.focus();
      setCursorToEnd(input);
    });
  });

  document.addEventListener("click", (event) => {
    document
      .querySelectorAll(".editable-field form:not(.hidden)")
      .forEach((form) => {
        if (!form.contains(event.target)) {
          const field = form.closest(".editable-field");
          const valueDisplay = field.querySelector(".value-display");
          form.classList.add("hidden");
          valueDisplay.hidden = false;
        }
      });
  });

  document.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      document
        .querySelectorAll(".editable-field form:not(.hidden)")
        .forEach((form) => {
          if (form.contains(event.target)) {
            event.preventDefault();
            form.submit();
          }
        });
    }
  });
}
function link_toggle() {
  const links = document.querySelectorAll(".settings-link");
  const sections = document.querySelectorAll(".settings-section");

  links.forEach((link) => {
    link.addEventListener("click", () => {
      const target = link.dataset.target + "-content"; // e.g., "account-content"

      // Hide all sections
      sections.forEach((section) => section.classList.add("hidden"));
      links.forEach((l) => l.classList.remove("active"));
      // Show the selected section
      document.getElementById(target).classList.remove("hidden");
      link.classList.add("active");
    });
  });
  // Trigger click on the first link to show initial section
  if (links.length > 0) {
    links[0].click();
  }
}

document.addEventListener("DOMContentLoaded", function () {
  settings();
  link_toggle();
});
