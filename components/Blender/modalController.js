export function createModalController(modalContent) {
  const modal = document.querySelector(".modal");
  const overlay = document.querySelector(".modal-bg-overlay");
  const title = document.querySelector(".modal-title");
  const description = document.querySelector(".modal-project-description");
  const visitButton = document.querySelector(".modal-project-visit-button");
  const exitButton = document.querySelector(".modal-exit-button");

  let isOpen = false;

  function open(id) {
    const content = modalContent[id];
    if (!content) return;

    title.textContent = content.title;
    description.textContent = content.content;

    visitButton.classList.toggle("hidden", !content.link);
    if (content.link) visitButton.href = content.link;

    modal.classList.remove("hidden");
    overlay.classList.remove("hidden");
    isOpen = true;
  }

  function close() {
    modal.classList.add("hidden");
    overlay.classList.add("hidden");
    isOpen = false;
  }

  function handleClick(hovered) {
    if (!hovered || isOpen) return;
    open(hovered.name);
  }

  function bind() {
    exitButton?.addEventListener("click", close);
    overlay?.addEventListener("click", close);
  }

  function cleanup() {
    exitButton?.removeEventListener("click", close);
    overlay?.removeEventListener("click", close);
  }

  return { handleClick, bind, cleanup };
}
