"use client";

import { useEffect } from 'react';

// Mobile Notice Banner functionality
export function initMobileNotice() {
  // Check if already dismissed this session
  if (typeof window !== 'undefined' && sessionStorage.getItem('mobileNoticeDismissed') === 'true') {
    const banner = document.querySelector('.mobile-notice-banner') as HTMLElement;
    if (banner) {
      banner.style.display = 'none';
    }
  }

  // Add dismiss handler
  if (typeof document !== 'undefined') {
    document.addEventListener('click', (e) => {
      const button = (e.target as HTMLElement).closest('.mobile-notice-dismiss');
      if (button) {
        const banner = button.closest('.mobile-notice-banner') as HTMLElement;
        if (banner) {
          banner.style.display = 'none';
          // Store in sessionStorage so it doesn't show again this session
          sessionStorage.setItem('mobileNoticeDismissed', 'true');
        }
      }
    });
  }
}

// React hook version
export function useMobileNotice() {
  useEffect(() => {
    initMobileNotice();
  }, []);
}
