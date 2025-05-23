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
      const itemId = button.dataset.itemId;
      const modalImg = document.getElementById(`modalImg-${itemId}`);
      if (modalImg) {
        modalImg.classList.remove("open");
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
}

document.addEventListener("DOMContentLoaded", modalWindow);
