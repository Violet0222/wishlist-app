// function settings_form_rendering() {
//   document
//     .getElementById("load-settings")
//     .addEventListener("click", function (e) {
//       e.preventDefault();

//       // Check if settings are already loaded
//       if (document.getElementById("settings-content")) {
//         return;
//       }

//       fetch("/settings")
//         .then((res) => res.text())
//         .then((html) => {
//           // Assume your settings page returns a partial, not the whole layout
//           const contentDiv = document.getElementById("account-content");
//           contentDiv.innerHTML = html;
//         })
//         .catch((err) => {
//           console.error("Failed to load settings:", err);
//         });
//     });
// }

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
      if (form && form.contains(event.target) && event.key === "Enter") {
        const field = form.closest(".editable-field");
        const valueElement = field.querySelector(".value-display");
        form.classList.add("hidden");
        valueElement.hidden = false;
        form.submit();
      }
    });
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

      // Show the selected section
      const activeSection = document.getElementById(target);
      if (activeSection) {
        activeSection.classList.remove("hidden");
      }
    });
  });
}

document.addEventListener("DOMContentLoaded", function () {
  settings();
  link_toggle();
});
