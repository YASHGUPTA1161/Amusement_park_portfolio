export function createModalController(modalContent) {
  let modal, overlay, title, description, visitButton, exitButton;
  let isOpen = false;

  function refreshElements() {
    modal = document.querySelector(".modal");
    overlay = document.querySelector(".modal-bg-overlay");
    title = document.querySelector(".modal-title");
    description = document.querySelector(".modal-project-description");
    visitButton = document.querySelector(".modal-project-visit-button");
    exitButton = document.querySelector(".modal-exit-button");
  }

  // Initial fetch
  refreshElements();

  function open(id) {
     if (!modal) refreshElements(); // Just in case
    
    // Fallback if ID not found but we want to show generic or debug info? 
    // For now assuming ID must exist or we do nothing.
    const content = modalContent[id];
    if (!content) {
        console.warn(`No content found for modal ID: ${id}`);
        return;
    }

    if (title) title.textContent = content.title;
    if (description) description.textContent = content.content;

    if (visitButton) {
      visitButton.classList.toggle("hidden", !content.link);
      if (content.link) visitButton.href = content.link;
    }

    if (modal) modal.classList.remove("hidden");
    if (overlay) overlay.classList.remove("hidden");
    isOpen = true;
  }

  function close() {
    if (!modal) refreshElements();
    
    if (modal) modal.classList.add("hidden");
    if (overlay) overlay.classList.add("hidden");
    isOpen = false;
  }

  function handleClick(hovered) {
    if (!hovered || isOpen) return;
    open(hovered.name);
  }

  function bind() {
    refreshElements(); // Critical: Ensure we have the latest DOM elements
    exitButton?.addEventListener("click", close);
    overlay?.addEventListener("click", close);
  }

  function cleanup() {
    // We should try to clean up using the same references if possible, 
    // but if they are gone, no harm.
    exitButton?.removeEventListener("click", close);
    overlay?.removeEventListener("click", close);
  }

  return { handleClick, bind, cleanup };
}
