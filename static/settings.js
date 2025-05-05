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

document.addEventListener("DOMContentLoaded", settings);
