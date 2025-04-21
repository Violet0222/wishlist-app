function modalWindow() {




    const openModalBtns = document.querySelectorAll(".openModalBtn");
    const modals = document.querySelectorAll(".modal");
    const closeModalBtns = document.querySelectorAll(".closeModalBtn");

    openModalBtns.forEach((btn, index) => {
        const modal = modals[index]
        const closeModalBtn = closeModalBtns[index]

        if (!modal || !closeModalBtn) return;

        // modal window opening
        btn.addEventListener("click", () => {
            modal.style.display = "block";
            setTimeout(function() {
                modal.classList.add("open");
            }, 10);
        });
        // Close modal window
        closeModalBtn.addEventListener("click", function() {
            modal.classList.remove("open");
            setTimeout(function() {
                modal.style.display = "none";
            }, 300);
        })

        // Close modal if clicked outside of modal content
        window.addEventListener("click", function(event) {
            if (event.target === modal) {
                modal.classList.remove("open");
                setTimeout(function() {
                    modal.style.display = "none";
                }, 300);
            }
        });
    })






}

document.addEventListener("DOMContentLoaded", modalWindow);
