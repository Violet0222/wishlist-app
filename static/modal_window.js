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
      const modal = button.closest(".modal-overlay");
      if (modal) {
        modal.classList.remove("open");
      }
    });
  });

  // Close description modal on outside click
  document.querySelectorAll(".modal-overlay").forEach((overlay) => {
    if (overlay.id.startsWith("modalDescription-")) {
      overlay.addEventListener("click", (event) => {
        if (event.target === overlay) {
          overlay.classList.remove("open");
        }
      });
    }
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

  const openModalBtnCopyLink = document.querySelector(".openModalBtnCopyLink");

  const modalCopyLink = document.getElementById("modalCopyLink");
  const closeModalBtnCopyLink = document.querySelector(
    ".closeModalBtnCopyLink"
  );
  const wishlistSelector = document.getElementById("wishlistSelector");
  const generatedLink = document.getElementById("generatedPublicLink");
  const copyBtn = document.getElementById("copyLinkBtn");

  // Открытие модалки
  openModalBtnCopyLink.addEventListener("click", () => {
    if (modalCopyLink) {
      modalCopyLink.classList.add("open");
    }
    updatePublicLink(); // показать ссылку для первого по умолчанию
  });

  // Закрытие по кнопке
  closeModalBtnCopyLink.addEventListener("click", () => {
    modalCopyLink.classList.remove("open");
  });

  // Закрытие по клику снаружи
  modalCopyLink.addEventListener("click", (event) => {
    if (event.target === modalCopyLink) {
      modalCopyLink.classList.remove("open");
    }
  });

  // Обновление ссылки при выборе другого списка
  wishlistSelector.addEventListener("change", updatePublicLink);

  function updatePublicLink() {
    const selectedOption =
      wishlistSelector.options[wishlistSelector.selectedIndex];
    const listId = selectedOption.value;
    const token = selectedOption.dataset.token;
    const baseUrl = window.location.origin; // например, https://example.com
    const link = `${baseUrl}/public/wishlist/${listId}?token=${token}`;
    generatedLink.textContent = link;
  }

  // Копировать ссылку
  copyBtn.addEventListener("click", () => {
    const tempInput = document.createElement("input");
    tempInput.value = generatedLink.textContent;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);
    copyBtn.textContent = "Copied!";
    setTimeout(() => (copyBtn.textContent = "Copy"), 2000);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  modalWindow();
});
