import React from "react";
import Image from "next/image";

const CenteredWindow = () => {
  return (
    <div className="center-wrap">
      <div className="window">
        <div className="titlebar">Home</div>
        <div className="window-body">
          <h1 className="hero-title">
            <span className="muted">Hi!</span>
            <span className="accent"> I&apos;m Yash</span>
          </h1>
          <p className="hero-sub">Developer, Designer, Creator</p>
          <div className="icon-row">
            <button className="icon-btn">
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
  );
};

export default CenteredWindow;
