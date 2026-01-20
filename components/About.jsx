import React from "react";
import { useDragableWindow } from "./DragableWindow";
import Image from "next/image";

const About = ({ onClose, positionY = 36, positionX = 50 }) => {
  const dragRef = useDragableWindow();
  return (
    <div
      ref={dragRef}
      id="about-window"
      className="window about-window"
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
        <span>about</span>
        <button className="close-btn" onClick={onClose}>
          ×
        </button>
      </div>
      
      <div className="window-body about-body-wrapper">
        {/* Fixed Header - Does NOT scroll */}
        <div className="about-fixed-header">
          <div className="about-header-content">
            <div className="about-avatar">
              <iframe 
                src="https://lottie.host/embed/dbd36a7c-df36-4f9a-b37b-495cd6d57fb0/6ympjw0ghm.lottie"
                className="avatar-animation"
                title="Profile Animation"
              />
            </div>
            <div className="about-intro">
              <h1 className="about-name">Yash Gupta</h1>
              <p className="about-subtitle">Full-Stack Developer</p>
              <p className="about-tagline">Former intern at <span className="highlight-orange">Grey Hatch Technologies</span></p>
            </div>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="about-scroll-content">
          
          {/* Description/Intro */}
          <section className="about-section">
            <p className="about-bio-text">
              I build end-to-end web features with a strong backend focus, designing APIs, data models, and business logic, while delivering clean, reliable frontend interfaces and handling practical deployments.
            </p>
          </section>

          {/* Education */}
          <section className="about-section">
            <h2 className="section-heading">EDUCATION</h2>
            <div className="education-item">
              <div className="education-highlight"></div>
              <div className="education-content">
                <p className="education-degree">B.Sc. Computer Science (AI & ML) · 2025</p>
                <p className="education-school">Manav Rachna International Institute of Research and Studies</p>
              </div>
            </div>
          </section>

          {/* Interests */}
          <section className="about-section">
            <h2 className="section-heading">OTHER INTERESTS</h2>
            <ul className="simple-list">
              <li>mechanical keyboards and custom builds</li>
              <li>Listening to music across genres</li>
              <li>Playing Soulslike and strategy games</li>
              <li>Building small fun projects</li>
              <li>Experimenting with automation n8n</li>
            </ul>
          </section>

          {/* Language Proficiency */}
          <section className="about-section">
            <h2 className="section-heading">LANGUAGE PROFICIENCY</h2>
            <div className="language-content">
              <p>i have strong experience in <span className="highlight-orange">JavaScript/TypeScript</span> and <span className="highlight-orange">Python</span>, and can work comfortably across the full stack.</p>
              <p className="language-note">English, Hindi</p>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
};
export default About;
