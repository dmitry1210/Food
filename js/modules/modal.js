
function closeModal(modalSelector) {
  const modal = document.querySelector(modalSelector);
  modal.classList.toggle("show");
  scrollController.enabledScroll();
}

function openModal(modalSelector, modalTimerID) {
  const modal = document.querySelector(modalSelector);

  modal.classList.toggle("show");
  scrollController.disabledScroll();

  console.log(modalTimerID);
  if (modalTimerID) {
    clearInterval(modalTimerID);
  }
}

function modal(triggerSelector, modalSelector, modalTimerID) {
  // Modal

  const scrollController = {
    scrollPosition: 0,
    disabledScroll() {
      scrollController.scrollPosition = window.scrollY;
      document.body.style.cssText = `
    overflow: hidden;
    // position: fixed;
    // top: -${scrollController.scrollPosition}px;
    // left: 0;
    // height: 100vh; 
    // width: 100vw;
    padding-right: ${window.innerWidth - document.body.offsetWidth}px;
    `;
      document.documentElement.style.scrollBehavior = "unset";
    },
    enabledScroll() {
      document.body.style.cssText = "";
      window.scroll({ top: scrollController.scrollPosition });
      document.documentElement.style.scrollBehavior = "";
    },
  };

  const modalTrigger = document.querySelectorAll(triggerSelector),
    modal = document.querySelector(modalSelector);

  modalTrigger.forEach((btn) => {
    btn.addEventListener("click", () => openModal(modalSelector, modalTimerID));
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal || e.target.getAttribute("data-close") == "") {
      closeModal(modalSelector);
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.code === "Escape" && modal.classList.contains("show")) {
      closeModal(modalSelector);
    }
  });

  function showModalByScroll() {
    if (
      document.documentElement.offsetHeight +
        document.documentElement.clientHeight ==
      document.documentElement.scrollHeight
    ) {
      openModal(modalSelector, modalTimerID);
      window.removeEventListener("scroll", showModalByScroll);
    }
  }

  window.addEventListener("scroll", showModalByScroll);
}

export default modal;
export { closeModal };
export { openModal };
