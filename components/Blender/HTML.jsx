export default function HTML() {
  return (
    <>
      <div id="experience">
        <canvas id="experience-canvas" />
      </div>

      <div className="modal-bg-overlay hidden" />

      <div className="modal hidden">
        <div className="modal-wrapper">
          <div className="modal-header">
            <h1 className="modal-title">Project One</h1>
            <button className="modal-exit-button">exit</button>
          </div>

          <div className="modal-content">
            <div className="modal-content-wrapper">
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="modal-project-visit-button"
              >
                view-project
              </a>

              <div className="modal-project-description">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
