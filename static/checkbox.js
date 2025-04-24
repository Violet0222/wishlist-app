function checkbox() {
  const checkboxContainers = document.querySelectorAll(
    '[id^="hide-container"]'
  );
  checkboxContainers.forEach((el)=>{
    el.addEventListener("change", (el) => {
      const checkbox = el.value;
      checkbox === 0 ? 1: 0;
      const form = el.closest('form');
          if (form) form.submit();
    });
  })
}

document.addEventListener("DOMContentLoaded", checkbox);
