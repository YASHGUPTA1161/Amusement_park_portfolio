import React from "react";
import { useDragableWindow } from "./DragableWindow";

const About = ({ onClose, positionY = 36, positionX = 50 }) => {
  const dragRef = useDragableWindow();
  return (
    <div
      ref={dragRef}
      id="about-window"
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
      <div id="about-windowheader" className="titlebar">
        <span>About</span>
        <button className="close-btn" onClick={onClose}>
          ×
        </button>
      </div>
      <div className="window-body">{/* links content */}</div>
    </div>
  );
};
export default About;
