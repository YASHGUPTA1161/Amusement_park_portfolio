import React, { useRef } from "react";
import { useDragableWindow } from "./DragableWindow";

const Contact = ({ onClose, positionY = 40, positionX = 50 }) => {
  const dragRef = useDragableWindow();
  const lottieRef = useRef(null);
  
  const handleEmailClick = () => {
    window.location.href = "mailto:yashguptayg116@gmail.com";
  };

  const handleAnimationClick = () => {
    if (lottieRef.current) {
      // Reload iframe to restart animation
      lottieRef.current.src = lottieRef.current.src;
    }
  };

  return (
    <div
      ref={dragRef}
      id="contact-window"
      className="window contact-window"
      style={{
        position: "fixed",
        top: `${positionY}%`,
        left: `${positionX}%`,
        transform: "translate(-50%, -50%)",
        zIndex: 900,
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <div id="contact-windowheader" className="titlebar">
        <span>contact</span>
        <button className="close-btn" onClick={onClose}>
          ×
        </button>
      </div>
      <div className="window-body contact-body">
        <h1 className="contact-title">yayy mail!</h1>
        <p className="contact-text">
          the easiest way to contact me is through email! i don't really check my
          social media messages, so please direct questions to my email instead 👍
        </p>
        
        <div className="contact-animation" onClick={handleAnimationClick}>
          <iframe 
            ref={lottieRef}
            src="https://lottie.host/embed/be8236b4-d7ab-4132-ae0d-eaa03cb71c90/RmXmZC1xyT.lottie"
            style={{
              width: '100%',
              height: '100%',
              border: 'none',
            }}
            title="Email Animation"
          />
        </div>

        <p className="contact-email">
          email me at:{" "}
          <a href="mailto:yashguptayg116@gmail.com" className="email-link">
            yashguptayg116@gmail.com
          </a>
        </p>
        
        <p className="contact-instructions">
          or press the button below to open your mail app.
        </p>

        <button className="contact-button" onClick={handleEmailClick}>
          send me an email!
        </button>
      </div>
    </div>
  );
};
export default Contact;
