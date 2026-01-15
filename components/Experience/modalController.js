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

  // Use event delegation for reliable click handling
  function handleDocumentClick(e) {
    // Check if clicked element is exit button or overlay
    if (e.target.classList.contains("modal-exit-button") || 
        e.target.classList.contains("modal-bg-overlay")) {
      close();
    }
  }

  function bind() {
    refreshElements(); // Critical: Ensure we have the latest DOM elements
    // Use event delegation on document for reliable handling
    document.addEventListener("click", handleDocumentClick);
  }

  function cleanup() {
    document.removeEventListener("click", handleDocumentClick);
  }

  return { handleClick, bind, cleanup };
}
