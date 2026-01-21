// components/Experience/touchController.js
export function createTouchController({ onMove }) {
  let touchStartX = 0;
  let touchStartY = 0;
  let isSwiping = false;
  const SWIPE_THRESHOLD = 50; // minimum swipe distance in pixels

  function handleTouchStart(e) {
    const touch = e.touches[0];
    touchStartX = touch.clientX;
    touchStartY = touch.clientY;
    isSwiping = true;
  }

  function handleTouchMove(e) {
    if (!isSwiping) return;
    // Prevent default to avoid scrolling while swiping
    e.preventDefault();
  }

  function handleTouchEnd(e) {
    if (!isSwiping) return;
    
    const touch = e.changedTouches[0];
    const diffX = touch.clientX - touchStartX;
    const diffY = touch.clientY - touchStartY;
    
    isSwiping = false;

    // Determine primary direction based on larger delta
    if (Math.abs(diffX) > Math.abs(diffY)) {
      // Horizontal swipe
      if (Math.abs(diffX) > SWIPE_THRESHOLD) {
        onMove(diffX > 0 ? 'right' : 'left');
      }
    } else {
      // Vertical swipe
      if (Math.abs(diffY) > SWIPE_THRESHOLD) {
        // Reverse logic: swiping down (positive) = move backward, swiping up (negative) = move forward
        onMove(diffY > 0 ? 'down' : 'up');
      }
    }
  }

  function bind() {
    // Wait for canvas to be available
    const tryBind = () => {
      const canvas = document.getElementById('experience-canvas');
      if (!canvas) {
        // Try again after a short delay
        setTimeout(tryBind, 100);
        return;
      }

      // Check if touch is supported
      if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
        canvas.addEventListener('touchstart', handleTouchStart, { passive: true });
        canvas.addEventListener('touchmove', handleTouchMove, { passive: false });
        canvas.addEventListener('touchend', handleTouchEnd, { passive: true });
        console.log('Touch controls enabled'); // Debug log
      }
    };

    tryBind();
  }

  function cleanup() {
    const canvas = document.getElementById('experience-canvas');
    if (canvas) {
      canvas.removeEventListener('touchstart', handleTouchStart);
      canvas.removeEventListener('touchmove', handleTouchMove);
      canvas.removeEventListener('touchend', handleTouchEnd);
    }
  }

  return { bind, cleanup };
}
