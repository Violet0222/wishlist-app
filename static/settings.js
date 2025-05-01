function settings() {
  const setCursorToEnd = (input) => {
    const length = input.value.length;
    input.setSelectionRange(length, length);
  };
  const editableFields = document.querySelectorAll(".editable-field");
  editableFields.forEach((field) => {
    const valueElement = field.querySelector(".value-display");
    const form = field.querySelector("form");
    const input = form.querySelector("input, select");

    if (!valueElement || !form || !input) return;
    field.addEventListener("click", (event) => {
      event.stopPropagation(); // prevent the click from bubbling to document
      valueElement.hidden = true;
      form.classList.remove("hidden");
      input.focus();
      setCursorToEnd(input);
      if (input.tagName === "INPUT") {
        input.setSelectionRange(input.value.length, input.value.length);
      }
    });
  });

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

  // document.querySelectorAll('select[name="currency"]').forEach((select) => {
  //   select.addEventListener("change", () => {
  //     select.closest("form").submit();
  //   });
  // });
  document.addEventListener("keypress", (event) => {
    editableFields.forEach((el) => {
      const forms = el.querySelector("form");
      forms.forEach((form) => {
        if (event.key === "Enter") {
          const field = form.closest(".editable-field");
          const valueElement = field.querySelector(".value-display");
          form.classList.add("hidden");
          valueElement.hidden = false;
          form.submit();
        }
      });
    });
  });
}

document.addEventListener("DOMContentLoaded", settings);
