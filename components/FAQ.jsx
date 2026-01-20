import React, { useState } from "react";
import { useDragableWindow } from "./DragableWindow";
import { faqData } from "./faqData";

const FAQ = ({ onClose, positionY = 38, positionX = 50 }) => {
  const dragRef = useDragableWindow();
  const [expanded, setExpanded] = useState({});

  const toggleQuestion = (index) => {
    setExpanded((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

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
        <span>frequently asked questions</span>
        <button className="close-btn" onClick={onClose}>
          x
        </button>
      </div>
      <div className="window-body faq-container">
        {faqData.map((item, index) => (
          <div key={index} className="faq-item">
            <button
              className="faq-question"
              onClick={() => toggleQuestion(index)}
            >
              <span>{item.question}</span>
              <span className="faq-arrow">{expanded[index] ? "▲" : "▼"}</span>
            </button>
            <div className={`faq-answer ${expanded[index] ? "expanded" : ""}`}>
              <div className="faq-answer-content">
                <p>{item.answer}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default FAQ;
