function modalWindow() {
  // Modal for New Item Category
  const openModalBtnNewItem = document.getElementById("openModalBtnNewItem");
  const modalNewItem = document.getElementById("modalNewItem");
  const closeModalBtnNewItem = document.getElementById("closeModalBtnNewItem");

  if (openModalBtnNewItem && modalNewItem && closeModalBtnNewItem) {
    openModalBtnNewItem.addEventListener("click", () => {
      modalNewItem.classList.add("open");
    });

    closeModalBtnNewItem.addEventListener("click", () => {
      modalNewItem.classList.remove("open");
    });

    modalNewItem.addEventListener("click", (event) => {
      if (event.target === modalNewItem) {
        modalNewItem.classList.remove("open");
      }
    });
  }

  // Modals for Copying Public Link
  const openModalBtnCopyLinks = document.querySelectorAll(
    ".openModalBtnCopyLink"
  );

  openModalBtnCopyLinks.forEach((button) => {
    button.addEventListener("click", () => {
      const categoryId = button.dataset.categoryId;
      const modalCopyLink = document.getElementById(
        `modalCopyLink-${categoryId}`
      );
      if (modalCopyLink) {
        modalCopyLink.classList.add("open");
      }
    });
  });

  const closeModalBtnCopyLinks = document.querySelectorAll(
    ".closeModalBtnCopyLink"
  );

  closeModalBtnCopyLinks.forEach((button) => {
    button.addEventListener("click", () => {
      const categoryId = button.dataset.categoryId;
      const modalCopyLink = document.getElementById(
        `modalCopyLink-${categoryId}`
      );
      if (modalCopyLink) {
        modalCopyLink.classList.remove("open");
      }
    });
  });

  // Close copy link modal on outside click
  document.querySelectorAll(".modal-overlay").forEach((overlay) => {
    if (overlay.id.startsWith("modalCopyLink-")) {
      overlay.addEventListener("click", (event) => {
        if (event.target === overlay) {
          overlay.classList.remove("open");
        }
      });
    }
  });

  // Functionality for the "Copy" button within the modal
  const copyToClipboardButtons = document.querySelectorAll(
    ".copy-to-clipboard-btn"
  );

  copyToClipboardButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const targetSelector = button.dataset.linkTarget;
      const linkElement = document.querySelector(targetSelector);

      if (linkElement) {
        const linkText = linkElement.textContent.trim();

        navigator.clipboard
          .copy(linkText)
          .then(() => {
            // Optional: Provide feedback (e.g., change button text temporarily)
            button.textContent = "Copied!";
            setTimeout(() => {
              button.textContent = "Copy";
            }, 2000);
          })
          .catch((err) => {
            console.error("Failed to copy link: ", err);
            alert("Failed to copy link."); // Basic error feedback
          });
      }
    });
  });

  // Modals for Image
  const openModalBtnImgs = document.querySelectorAll(".openModalBtnImg");

  openModalBtnImgs.forEach((openModalBtnImg) => {
    openModalBtnImg.addEventListener("click", () => {
      const itemId = openModalBtnImg.dataset.itemId;
      const modalImg = document.getElementById(`modalImg-${itemId}`);
      if (modalImg) {
        modalImg.classList.add("open");
      }
    });
  });
  const closeModalBtnImg = document.querySelectorAll(".closeModalBtnImg");
  closeModalBtnImg.forEach((button) => {
    button.addEventListener("click", () => {
      const modal = button.closest(".modal-overlay");
      if (modal) {
        modal.classList.remove("open");
      }
    });
  });

  // Close image modal on outside click
  document.querySelectorAll(".modal-overlay").forEach((overlay) => {
    if (overlay.id.startsWith("modalImg-")) {
      overlay.addEventListener("click", (event) => {
        if (event.target === overlay) {
          overlay.classList.remove("open");
        }
      });
    }
  });

  const cancelButtons = document.querySelectorAll(".cancel-btn");

  cancelButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const modal = button.closest(".modal-overlay");
      if (modal) {
        modal.classList.remove("open");
      }
    });
  });

  const openModalBtnDescriptions = document.querySelectorAll(
    ".openModalBtnDescription"
  );
  openModalBtnDescriptions.forEach((button) => {
    button.addEventListener("click", () => {
      const itemId = button.dataset.itemId;
      const modal = document.getElementById(`modalDescription-${itemId}`);
      if (modal) {
        modal.classList.add("open");
      }
    });
  });

  const closeModalBtnDescriptions = document.querySelectorAll(
    ".closeModalBtnDescription"
  );
  closeModalBtnDescriptions.forEach((button) => {
    button.addEventListener("click", () => {
      // Find the closest ancestor with the class 'description-modal'
      const modal = button.closest(".description-modal");
      if (modal) {
        modal.classList.remove("open");
      }
    });
  });

  // Close description modal on outside click
  document.querySelectorAll(".description-modal").forEach((overlay) => {
    overlay.addEventListener("click", (event) => {
      if (event.target === overlay) {
        overlay.classList.remove("open");
      }
    });
  });
  // Open Currency Modal
  document.querySelectorAll(".openModalBtnCurrency").forEach((btn) => {
    btn.addEventListener("click", () => {
      const itemId = btn.dataset.itemId;
      const modal = document.getElementById(`modalCurrency-${itemId}`);
      if (modal) {
        modal.classList.add("open");
      }
    });
  });

  // Close Currency Modal
  document
    .querySelectorAll(".closeModalBtnCurrency, .cancelCurrencyBtn")
    .forEach((btn) => {
      btn.addEventListener("click", () => {
        const itemId = btn.dataset.itemId;
        const modal = document.getElementById(`modalCurrency-${itemId}`);
        if (modal) {
          modal.classList.remove("open");
        }
      });
    });

  // Close description modal on outside click
  document.querySelectorAll(".currency-modal").forEach((overlay) => {
    overlay.addEventListener("click", (event) => {
      if (event.target === overlay) {
        overlay.classList.remove("open");
      }
    });
  });

  // Open Priority Modal
  document.querySelectorAll(".openModalBtnPriority").forEach((btn) => {
    btn.addEventListener("click", () => {
      const itemId = btn.getAttribute("data-item-id");
      const modal = document.getElementById(`modalPriority-${itemId}`);
      console.log(modal);
      if (modal) {
        modal.classList.add("open");
      }
    });
  });

  // Close Priority Modal
  document
    .querySelectorAll(".closeModalBtnPriority, .cancelPriorityBtn")
    .forEach((btn) => {
      btn.addEventListener("click", () => {
        const itemId = btn.getAttribute("data-item-id");
        document.getElementById(`modalPriority-${itemId}`).style.display =
          "none";
      });
    });

  // Open List Name Modal
  document.querySelectorAll(".openModalBtnListName").forEach((btn) => {
    btn.addEventListener("click", () => {
      const itemId = btn.getAttribute("data-item-id");
      const modal = document.getElementById(`modalListName-${itemId}`);
      if (modal) {
        modal.classList.add("open");
      }
    });
  });

  // Close List Name Modal
  document
    .querySelectorAll(".closeModalBtnListName, .cancelListNameBtn")
    .forEach((btn) => {
      btn.addEventListener("click", () => {
        const itemId = btn.getAttribute("data-item-id");
        const modal = document.getElementById(`modalListName-${itemId}`);
        if (modal) {
          modal.classList.remove("open");
        }
      });
    });

  // Open Category Modal
  document.querySelectorAll(".openModalBtnCategoryName").forEach((btn) => {
    btn.addEventListener("click", () => {
      const itemId = btn.getAttribute("data-item-id");
      const modal = document.getElementById(`modalCategoryName-${itemId}`);
      if (modal) {
        modal.classList.add("open");
      }
    });
  });

  document.querySelectorAll(".list-name-form").forEach((form) => {
    form.addEventListener("submit", function (e) {
      const select = form.querySelector('select[name="list_name"]');
      const selectedOption = select.options[select.selectedIndex];
      const emoji = selectedOption.getAttribute("data-emoji");

      const emojiInput = form.querySelector('input[name="emoji"]');
      if (emojiInput) {
        emojiInput.value = emoji;
      }
    });
  });

  // Close Category Modal
  document
    .querySelectorAll(".closeModalBtnCategoryName, .cancelCategoryNameBtn")
    .forEach((btn) => {
      btn.addEventListener("click", () => {
        const itemId = btn.getAttribute("data-item-id");
        const modal = document.getElementById(`modalCategoryName-${itemId}`);
        if (modal) {
          modal.classList.remove("open");
        }
      });
    });

  document.querySelectorAll(".category-form").forEach((form) => {
    form.addEventListener("submit", function (e) {
      const select = form.querySelector('select[name="category_name"]');
      const selectedOption = select.options[select.selectedIndex];
      const emoji = selectedOption.getAttribute("data-emoji");

      const emojiInput = form.querySelector('input[name="category_emoji"]');
      if (emojiInput) {
        emojiInput.value = emoji;
      }
    });
  });

  // Open the share modal
  document.querySelectorAll(".openCopyLinkModalBtn").forEach((button) => {
    button.addEventListener("click", () => {
      const listId = button.getAttribute("data-list-id");
      const modal = document.getElementById(`modalCopyLink-${listId}`);
      if (modal) modal.style.display = "block";
    });
  });

  // Close the modal
  document.querySelectorAll(".closeModalBtnCopyLink").forEach((button) => {
    button.addEventListener("click", () => {
      const listId = button.getAttribute("data-list-id");
      const modal = document.getElementById(`modalCopyLink-${listId}`);
      if (modal) modal.style.display = "none";
    });
  });

  // Copy to clipboard logic
  document.querySelectorAll(".copy-to-clipboard-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const target = button.getAttribute("data-link-target");
      const linkElement = document.querySelector(target);
      if (linkElement) {
        const text = linkElement.textContent;
        navigator.clipboard.writeText(text).then(() => {
          button.textContent = "Copied!";
          setTimeout(() => (button.textContent = "Copy"), 2000);
        });
      }
    });
  });
}

// function imgModalWindow() {
//   const modal = document.getElementById("imgModal");
//   const modalImg = document.getElementById("modalImgContent");
//   const closeBtn = document.querySelector(".img-modal-close");

//   document.querySelectorAll(".clickable-image").forEach((img) => {
//     img.addEventListener("click", () => {
//       modal.style.display = "block";
//       modalImg.src = img.dataset.full;
//     });
//   });

//   closeBtn.onclick = () => {
//     modal.style.display = "none";
//   };

//   window.onclick = (event) => {
//     if (event.target === modal) {
//       modal.style.display = "none";
//     }
//   };
// }

document.addEventListener("DOMContentLoaded", () => {
  modalWindow();
});
