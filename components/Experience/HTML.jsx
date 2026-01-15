"use client";

export default function HTML() {
  return (
    <>
      {/* Three.js mount */}
      <div id="experience">
        <canvas id="experience-canvas" />
      </div>

      {/* Loading Screen */}
      <div className="loading-screen" id="loadingScreen">
        <div className="loading-text">Loading...</div>
        <img 
          src="/logo/logo.png" 
          alt="Logo" 
          className="loading-logo"
        />
        <button className="enter-button">Enter Park!</button>
        <div className="instructions">~ use arrow keys to move ~</div>
      </div>

      {/* Theme Toggle */}
      <div className="theme-mode-toggle-button">
        <svg
          width="80"
          height="80"
          viewBox="0 0 80 80"
          className="first-icon"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect x="25" y="25" width="30" height="30" fill="white" />
          <rect
            width="4"
            height="19"
            transform="matrix(-1 0 0 1 42 0)"
            fill="white"
          />
          <rect
            width="4"
            height="19"
            transform="matrix(-1 0 0 1 42 61)"
            fill="white"
          />
          <rect
            width="4"
            height="19"
            transform="matrix(0 -1 -1 0 80 42)"
            fill="white"
          />
          <rect
            width="4"
            height="14"
            transform="matrix(0.707107 -0.707107 -0.707107 -0.707107 18.8994 22.728)"
            fill="white"
          />
          <rect
            width="4"
            height="14"
            transform="matrix(0.719888 0.69409 -0.719888 0.69409 19.0786 59.0491)"
            fill="white"
          />
          <rect
            width="4"
            height="14"
            transform="matrix(0.707107 0.707107 0.707107 -0.707107 58 19.8994)"
            fill="white"
          />
          <rect
            width="4"
            height="14"
            transform="matrix(0.719888 -0.69409 0.719888 0.69409 58.1792 61.7764)"
            fill="white"
          />
          <rect
            width="4"
            height="19"
            transform="matrix(0 -1 -1 0 19 42)"
            fill="white"
          />
        </svg>

        <svg
          width="46"
          height="46"
          viewBox="0 0 46 46"
          className="second-icon"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M26.8333 0H46V46H0V26.8333H26.8333V0ZM34 12H41.6667V19.6667H34V12ZM33.2222 26.8333H40.8889V34.5H33.2222V26.8333ZM23 33.2222H15.3333V40.8889H23V33.2222Z"
            fill="white"
          />
        </svg>
      </div>

      {/* Window Toggle */}
      <div className="window-toggle-button">
        <svg
          width="48"
          height="48"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect x="8" y="8" width="32" height="32" fill="white" />
          <rect x="8" y="8" width="32" height="8" fill="white" opacity="0.7" />
          <rect x="12" y="20" width="10" height="10" fill="white" opacity="0.3" />
          <rect x="26" y="20" width="10" height="10" fill="white" opacity="0.3" />
          <rect x="12" y="32" width="24" height="4" fill="white" opacity="0.3" />
        </svg>
      </div>

      {/* Audio Toggle */}
      <div className="audio-toggle-button">
        <svg
          width="102"
          height="69"
          viewBox="0 0 102 69"
          className="first-icon-two"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect y="17" width="24" height="37" fill="white" />
          <rect x="39" width="24" height="69" fill="white" />
          <rect x="78" y="12" width="24" height="42" fill="white" />
        </svg>

        <svg
          width="102"
          height="24"
          viewBox="0 0 102 24"
          className="second-icon-two"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="24" height="24" fill="white" />
          <rect x="39" width="24" height="24" fill="white" />
          <rect x="78" width="24" height="24" fill="white" />
        </svg>
      </div>

      {/* Modal */}
      <div className="modal-bg-overlay hidden" />
      <div className="modal hidden">
        <div className="modal-wrapper">
          <div className="modal-header">
            <h1 className="modal-title">Project One</h1>
            <button className="modal-exit-button">exit</button>
          </div>

          <div className="modal-content">
            <div className="modal-content-wrapper">
              <p className="modal-project-description">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </p>

              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="modal-project-visit-button hidden"
              >
                View Project
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Controls */}
      <div className="mobile-control up-arrow" />
      <div className="mobile-control left-arrow" />
      <div className="mobile-control right-arrow" />
      <div className="mobile-control down-arrow" />
    </>
  );
}
