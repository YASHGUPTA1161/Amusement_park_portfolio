import React from "react";
import Image from "next/image";
import { useDragableWindow } from "./DragableWindow";
import { useState } from "react";
import Links from "./Links";
import Work from "./Work";
import About from "./About";
import FAQ from "./FAQ";
import Contact from "./Contact";

const CenteredWindow = () => {
  const dragRef = useDragableWindow();
  const [showLinks, setShowLinks] = useState(false);
  const [showWork, setShowWork] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [showFAQ, setShowFAQ] = useState(false);
  const [showContact, setShowContact] = useState(false);
  return (
    <>
      <div
        className="center-wrap"
        onClick={() => {
          // Close Links window when clicking the background
          if (showLinks) {
            setShowLinks(false);
          }
          if (showWork) {
            setShowWork(false);
          }
          if (showAbout) {
            setShowAbout(false);
          }
          if (showFAQ) {
            setShowFAQ(false);
          }
          if (showContact) {
            setShowContact(false);
          }
        }}
      >
        <div
          ref={dragRef}
          id="home-window"
          className="window"
          style={{ position: "absolute" }}
          onClick={(e) => e.stopPropagation()}
        >
          <div id="home-windowheader" className="titlebar">
            <span>Home</span>
          </div>
          <div className="window-body">
            <h1 className="hero-title">
              <span className="muted">Hi!</span>
              <span className="accent"> I&apos;m Yash</span>
            </h1>
            <p className="hero-sub">Developer, Designer, Creator</p>
            <div className="icon-row">
              <button onClick={() => setShowLinks(true)} className="icon-btn">
                <div className="icon-box">
                  <Image
                    src="/icons/buttons/links.svg"
                    alt="Links"
                    width={28}
                    height={28}
                  />
                </div>
                <span className="icon-lable">Links</span>
              </button>
              <button onClick={() => setShowWork(true)} className="icon-btn">
                <div className="icon-box">
                  <Image
                    src="/icons/buttons/work.svg"
                    alt="Work"
                    width={28}
                    height={28}
                  />
                </div>
                <span className="icon-lable">Work</span>
              </button>
              <button onClick={() => setShowAbout(true)} className="icon-btn">
                <div className="icon-box">
                  <Image
                    src="/icons/buttons/about.svg"
                    alt="About"
                    width={28}
                    height={28}
                  />
                </div>
                <span className="icon-lable">about</span>
              </button>
              <button onClick={() => setShowFAQ(true)} className="icon-btn">
                <div className="icon-box">
                  <Image
                    src="/icons/buttons/faq.svg"
                    alt="FAQ"
                    width={28}
                    height={28}
                  />
                </div>
                <span className="icon-lable">FAQ</span>
              </button>
              <button onClick={() => setShowContact(true)} className="icon-btn">
                <div className="icon-box">
                  <Image
                    src="/icons/buttons/contact.svg"
                    alt="Contact"
                    width={28}
                    height={28}
                  />
                </div>
                <span className="icon-lable">Contact</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      {(() => {
        // Calculate positions dynamically based on order opened
        let positionY = 60; // Start at 36% (vertical)
        let positionX = 50; // Start at 50% (horizontal, centered)
        const increment = 5; // Increase by 5% for each window

        const windows = [];

        if (showLinks) {
          windows.push(
            <Links
              key="links"
              positionY={positionY}
              positionX={positionX}
              onClose={() => setShowLinks(false)}
            />
          );
          positionY += increment;
          positionX += increment;
        }
        if (showWork) {
          windows.push(
            <Work
              key="work"
              positionY={positionY}
              positionX={positionX}
              onClose={() => setShowWork(false)}
            />
          );
          positionY += increment;
          positionX += increment;
        }
        if (showAbout) {
          windows.push(
            <About
              key="about"
              positionY={positionY}
              positionX={positionX}
              onClose={() => setShowAbout(false)}
            />
          );
          positionY += increment;
          positionX += increment;
        }
        if (showFAQ) {
          windows.push(
            <FAQ
              key="faq"
              positionY={positionY}
              positionX={positionX}
              onClose={() => setShowFAQ(false)}
            />
          );
          positionY += increment;
          positionX += increment;
        }
        if (showContact) {
          windows.push(
            <Contact
              key="contact"
              positionY={positionY}
              positionX={positionX}
              onClose={() => setShowContact(false)}
            />
          );
        }

        return windows;
      })()}
    </>
  );
};

export default CenteredWindow;
