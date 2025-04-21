function modalWindow() {




    const openModalBtn = document.querySelectorAll(".openModalBtn");
    const modal = document.querySelectorAll(".modal");
    const closeModalBtn = document.querySelectorAll(".closeModalBtn");

    // modal window opening
   openModalBtn.addEventListener("click", () => {
       modal.style.display = "block";
       setTimeout(function() {
           modal.classList.add("open");
       }, 10);
   })
    // Close modal window
    closeModalBtn.addEventListener("click", function() {
        modal.classList.remove("open");
        setTimeout(function() {
            modal.style.display = "none";
        }, 300);
    });

    // Close modal if clicked outside of modal content
    window.addEventListener("click", function(event) {
        if (event.target === modal) {
            modal.classList.remove("open");
            setTimeout(function() {
                modal.style.display = "none";
            }, 300);
        }
    });

}

document.addEventListener("DOMContentLoaded", modalWindow);
