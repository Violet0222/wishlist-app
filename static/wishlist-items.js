function initWishListItems() {
  const items = document.querySelectorAll('[id^="item-"]');

  const setCursorToEnd = (input) => {
    if (input.tagName === "INPUT") {
      const length = input.value.length;
      input.setSelectionRange(length, length);
    }
  };

  for (const item of items) {
    const editableFields = item.querySelectorAll(".editable-field");
    editableFields.forEach((field) => {
      const valueElement = field.querySelector(".value-display");
      const form = field.querySelector("form");
      const editableInput = form.querySelector("input, select, textarea");

      if (!valueElement || !form || !editableInput) return;

      // --- Ensure the form is hidden on load ---
      form.classList.add("hidden");
      valueElement.hidden = false; // Ensure value display is visible

      field.addEventListener("click", (event) => {
        if (
          event.target.closest(".dropdown-container") ||
          event.target.tagName === "A"
        ) {
          return;
        }
        event.stopPropagation();

        document
          .querySelectorAll(".editable-field form:not(.hidden)")
          .forEach((openForm) => {
            const openField = openForm.closest(".editable-field");
            const openValueElement = openField.querySelector(".value-display");
            openForm.classList.add("hidden");
            openValueElement.hidden = false;
          });

        valueElement.hidden = true;
        form.classList.remove("hidden");
        editableInput.focus();
        setCursorToEnd(editableInput);
      });

      editableInput.addEventListener("blur", function () {
        if (!form.contains(document.activeElement)) {
          form.submit();
        }
      });

      form.addEventListener("mousedown", function (event) {
        event.preventDefault();
      });

      if (editableInput.tagName !== "SELECT") {
        editableInput.addEventListener("keypress", function (event) {
          if (event.key === "Enter") {
            event.preventDefault();
            form.submit();
          }
        });
      }

      if (editableInput.tagName === "SELECT") {
        editableInput.addEventListener("change", function () {
          form.submit();
        });
      }
    });
  }

  document.addEventListener("click", (event) => {
    const openFields = document.querySelectorAll(
      ".editable-field form:not(.hidden)"
    );
    openFields.forEach((form) => {
      const field = form.closest(".editable-field");
      if (!form.contains(event.target) && !field.contains(event.target)) {
        const valueElement = field.querySelector(".value-display");
        form.classList.add("hidden");
        valueElement.hidden = false;
        form.reset();
      }
    });
  });
}

function togglePrivate(event, category_id, item_id) {
  const value = event.target.checked;
  const formData = new FormData();
  formData.append("private", value.toString());
  return fetch(`/wishlist/${category_id}/private_${item_id}`, {
    method: "POST",
    body: formData,
  });
}

document.addEventListener("DOMContentLoaded", initWishListItems);
