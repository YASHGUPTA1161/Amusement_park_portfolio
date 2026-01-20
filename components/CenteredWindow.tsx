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
  
  // Track window order for z-index
  const [windowOrder, setWindowOrder] = useState<string[]>([]);

  const bringToFront = (windowName: string) => {
    setWindowOrder(prev => {
      const filtered = prev.filter(w => w !== windowName);
      return [...filtered, windowName];
    });
  };

  const openWindow = (windowName: string, setter: (val: boolean) => void) => {
    setter(true);
    bringToFront(windowName);
  };

  const closeWindow = (windowName: string, setter: (val: boolean) => void) => {
    setter(false);
    setWindowOrder(prev => prev.filter(w => w !== windowName));
  };

  return (
    <>
      <div
        className="center-wrap"
        onClick={() => {
          // Close all windows when clicking the background
          if (showLinks) setShowLinks(false);
          if (showWork) setShowWork(false);
          if (showAbout) setShowAbout(false);
          if (showFAQ) setShowFAQ(false);
          if (showContact) setShowContact(false);
          setWindowOrder([]);
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
              <button onClick={() => openWindow('links', setShowLinks)} className="icon-btn">
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
              <button onClick={() => openWindow('work', setShowWork)} className="icon-btn">
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
              <button onClick={() => openWindow('about', setShowAbout)} className="icon-btn">
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
              <button onClick={() => openWindow('faq', setShowFAQ)} className="icon-btn">
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
              <button onClick={() => openWindow('contact', setShowContact)} className="icon-btn">
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
        const windows = [];
        const baseZIndex = 900;

        if (showLinks) {
          const zIndex = baseZIndex + windowOrder.indexOf('links');
          windows.push(
            <div key="links" style={{ zIndex }} onClick={() => bringToFront('links')}>
              <Links 
                positionY={36}
                positionX={50}
                onClose={() => closeWindow('links', setShowLinks)} 
              />
            </div>
          );
        }
        if (showWork) {
          const zIndex = baseZIndex + windowOrder.indexOf('work');
          windows.push(
            <div key="work" style={{ zIndex }} onClick={() => bringToFront('work')}>
              <Work 
                positionY={34}
                positionX={50}
                onClose={() => closeWindow('work', setShowWork)} 
              />
            </div>
          );
        }
        if (showAbout) {
          const zIndex = baseZIndex + windowOrder.indexOf('about');
          windows.push(
            <div key="about" style={{ zIndex }} onClick={() => bringToFront('about')}>
              <About 
                positionY={36}
                positionX={50}
                onClose={() => closeWindow('about', setShowAbout)} 
              />
            </div>
          );
        }
        if (showFAQ) {
          const zIndex = baseZIndex + windowOrder.indexOf('faq');
          windows.push(
            <div key="faq" style={{ zIndex }} onClick={() => bringToFront('faq')}>
              <FAQ 
                positionY={38}
                positionX={50}
                onClose={() => closeWindow('faq', setShowFAQ)} 
              />
            </div>
          );
        }
        if (showContact) {
          const zIndex = baseZIndex + windowOrder.indexOf('contact');
          windows.push(
            <div key="contact" style={{ zIndex }} onClick={() => bringToFront('contact')}>
              <Contact 
                positionY={40}
                positionX={50}
                onClose={() => closeWindow('contact', setShowContact)} 
              />
            </div>
          );
        }

        return windows;
      })()}
    </>
  );
};

export default CenteredWindow;
