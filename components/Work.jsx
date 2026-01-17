import React from "react";
import { useDragableWindow } from "./DragableWindow";

const Work = ({ onClose, positionY = 34, positionX = 50 }) => {
  const dragRef = useDragableWindow();
  return (
    <div
      ref={dragRef}
      id="work-window"
      className="window"
      style={{
        position: "fixed",
        top: `${positionY}%`,
        left: `${positionX}%`,
        transform: "translate(-50%, -50%)",
        zIndex: 900,
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <div id="work-windowheader" className="titlebar">
        <span>Work</span>
        <button className="close-btn" onClick={onClose}>
          ×
        </button>
      </div>
      <div className="window-body">{/* links content */}</div>
    </div>
  );
};
export default Work;
