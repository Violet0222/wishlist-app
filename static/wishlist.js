function category_update() {
  const items = document.querySelectorAll('[id^="category-"]');

  const setCursorToEnd = (input) => {
    if (
      [
        "text",
        "textarea",
        "search",
        "url",
        "tel",
        "email",
        "password",
      ].includes(input.type)
    ) {
      const length = input.value.length;
      input.setSelectionRange(length, length);
    }
  };

  for (const item of items) {
    const editableFields = item.querySelectorAll(".editable-field");
    editableFields.forEach((field) => {
      const valueElement = field.querySelector(".value-display");
      const form = field.querySelector("form");
      const input = form.querySelector("input, select");

      if (!valueElement || !form || !input) return;

      field.addEventListener("click", (event) => {
        event.stopPropagation();
        valueElement.hidden = true;
        form.classList.remove("hidden");
        input.focus();
        setCursorToEnd(input);
      });

      field.querySelector(".emoji").addEventListener("change", function () {
        const form = this.closest("form");
        if (form) {
          form.submit();
        }
      });
      field.querySelector(".name").addEventListener("change", function () {
        const form = this.closest("form");
        if (form) {
          form.submit();
        }
      });

      document.querySelectorAll(".color-input").forEach((input) => {
        input.addEventListener("change", function () {
          const form = this.closest("form");
          if (form) {
            form.submit();
          }
        });
      });
    });
    document.addEventListener("click", (event) => {
      const openFields = document.querySelectorAll(
        ".editable-field form:not(.hidden)"
      );
      openFields.forEach((form) => {
        if (
          !form.contains(event.target) &&
          !event.target.classList.contains("color-input")
        ) {
          const field = form.closest(".editable-field");
          const valueElement = field.querySelector(".value-display");
          form.classList.add("hidden");
          valueElement.hidden = false;
        }
      });
    });
  }

  document.addEventListener("click", (event) => {
    const openFields = document.querySelectorAll(
      ".editable-field form:not(.hidden)"
    );
    openFields.forEach((form) => {
      if (!form.contains(event.target)) {
        const field = form.closest(".editable-field");
        const valueElement = field.querySelector(".value-display");
        form.classList.add("hidden");
        valueElement.hidden = false;
      }
    });
  });
}

document.addEventListener("DOMContentLoaded", category_update);
