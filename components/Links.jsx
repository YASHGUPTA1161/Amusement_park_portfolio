import React from "react";
import { useDragableWindow } from "./DragableWindow";

const Links = ({ onClose }) => {
  const dragRef = useDragableWindow();
  return (
    <div
      ref={dragRef}
      id="links-window"
      className="window"
      style={{ 
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: 900
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <div id="links-windowheader" className="titlebar">
        <span>Links</span>
        <button className="close-btn" onClick={onClose}>×</button>
      </div>
      <div className="window-body">{/* links content */}</div>
    </div>
  );
};
export default Links;
