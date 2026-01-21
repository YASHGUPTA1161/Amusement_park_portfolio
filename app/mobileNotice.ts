// Add dismiss functionality for mobile notice banners
if (typeof window !== 'undefined') {
  // Wait for DOM to be ready
  const initDismiss = () => {
    const dismissButtons = document.querySelectorAll('.mobile-notice-dismiss');
    
    dismissButtons.forEach(button => {
      button.addEventListener('click', () => {
        const banner = button.closest('.mobile-notice-banner');
        if (banner) {
          banner.style.display = 'none';
          // Store in sessionStorage so it doesn't show again this session
          sessionStorage.setItem('mobileNoticeDismissed', 'true');
        }
      });
    });

    // Check if already dismissed this session
    if (sessionStorage.getItem('mobileNoticeDismissed') === 'true') {
      const banners = document.querySelectorAll('.mobile-notice-banner');
      banners.forEach(banner => {
        banner.style.display = 'none';
      });
    }
  };

  // Run after a short delay to ensure DOM is loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDismiss);
  } else {
    setTimeout(initDismiss, 100);
  }
}

export {};
