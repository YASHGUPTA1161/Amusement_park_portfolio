import React from "react";
import { useDragableWindow } from "./DragableWindow";

const FAQ = ({ onClose, positionY = 38, positionX = 50 }) => {
  const dragRef = useDragableWindow();
  return (
    <div
      ref={dragRef}
      id="faq-window"
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
      <div id="faq-windowheader" className="titlebar">
        <span>FAQ</span>
        <button className="close-btn" onClick={onClose}>
          ×
        </button>
      </div>
      <div className="window-body">{/* links content */}</div>
    </div>
  );
};
export default FAQ;
