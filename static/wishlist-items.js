function initWishListItems() {
  const items = document.querySelectorAll('[id^="item-"]');

  const setCursorToEnd = (input) => {
    // Check if the input type supports setSelectionRange
    if (
      (input.tagName === "INPUT" &&
        (input.type === "text" ||
          input.type === "search" ||
          input.type === "url" ||
          input.type === "tel" ||
          input.type === "password")) ||
      input.tagName === "TEXTAREA"
    ) {
      const length = input.value.length;
      input.setSelectionRange(length, length);
    }
  };

  for (const item of items) {
    // Select editable fields, but exclude currency cells
    const editableFields = item.querySelectorAll(
      ".editable-field:not(.currency-cell)"
    ); // <--- Added exclusion here
    editableFields.forEach((field) => {
      const valueElement = field.querySelector(".value-display");
      const form = field.querySelector("form");
      const editableInput = form?.querySelector("input, select, textarea");

      if (!valueElement || !form || !editableInput) return;

      // Ensure the form is hidden and the value is visible on load
      form.classList.add("hidden");
      valueElement.hidden = false;

      // Click handler to open the input form
      field.addEventListener("click", (event) => {
        // Add condition to not interfere with the currency span click
        if (
          event.target.closest(".dropdown-container") ||
          event.target.tagName === "A" ||
          event.target.classList.contains("openModalBtnCurrency") // <--- Added check here
        ) {
          return;
        }
        event.stopPropagation();

        // Hide other open forms
        document
          .querySelectorAll(".editable-field form:not(.hidden)")
          .forEach((openForm) => {
            const openField = openForm.closest(".editable-field");
            const openValueElement = openField.querySelector(".value-display");
            openForm.classList.add("hidden");
            openValueElement.hidden = false;
          });

        form.classList.remove("hidden");
        valueElement.hidden = true;

        setTimeout(() => {
          editableInput.focus();
          setCursorToEnd(editableInput);
        }, 0);
      });

      // Cancel button logic
      const cancelBtn = form.querySelector(".cancel-btn");
      if (cancelBtn) {
        cancelBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          form.classList.add("hidden");
          valueElement.hidden = false;
        });
      }

      // If it's an image input, add live preview
      if (editableInput.name === "image" && editableInput.type === "file") {
        editableInput.addEventListener("change", () => {
          const file = editableInput.files[0];
          if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
              const preview = field.querySelector(".image-preview");
              if (preview) {
                preview.src = e.target.result;
              }
            };
            reader.readAsDataURL(file);
          }
        });
      }
    });
  }

  // Click outside to close all
  document.addEventListener("click", (event) => {
    // Add condition to not close the currency modal on outside click
    if (
      event.target.closest(".modal-overlay") &&
      event.target.id.startsWith("modalCurrency-")
    ) {
      return;
    }

    document
      .querySelectorAll(".editable-field form:not(.hidden)")
      .forEach((openForm) => {
        const openField = openForm.closest(".editable-field");
        const openValueElement = openField.querySelector(".value-display");
        openForm.classList.add("hidden");
        openValueElement.hidden = false;
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
