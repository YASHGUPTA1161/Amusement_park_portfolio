import React from "react";
import Image from "next/image";
import { useDragableWindow } from "./DragableWindow";
import { useState } from "react";
import Links from "./Links";

const CenteredWindow = () => {
  const dragRef = useDragableWindow();
  const [showLinks, setShowLinks] = useState(false);
  return (
    <>
      <div className="center-wrap" onClick={() => {
        // Close Links window when clicking the background
        if (showLinks) {
          setShowLinks(false);
        }
      }}>
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
              <button className="icon-btn">
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
              <button className="icon-btn">
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
              <button className="icon-btn">
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
              <button className="icon-btn">
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
      {showLinks && <Links onClose={() => setShowLinks(false)} />}
    </>
  );
};

export default CenteredWindow;
