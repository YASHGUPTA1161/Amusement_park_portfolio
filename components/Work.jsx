import React from "react";
import { useDragableWindow } from "./DragableWindow";
import Image from "next/image";

const Work = ({ onClose, positionY = 34, positionX = 50 }) => {
  const dragRef = useDragableWindow();
  return (
    <div
      ref={dragRef}
      id="work-window"
      className="window work-window"
      style={{
        position: "fixed",
        top: `${positionY}%`,
        left: `${positionX}%`,
        transform: "translate(-50%, -50%)",
        zIndex: 900,
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <div id="work-windowheader" className="titlebar">
        <span>Work</span>
        <button className="close-btn" onClick={onClose}>
          ×
        </button>
      </div>
      <div className="window-body">
        <div className="work-notice">
          <p>
            I design and build interactive web experiences. Available for
            full-time roles and serious freelance work. Contact me via{" "}
            <a href="mailto:yashguptayg116@gmail.com" className="email-link">
              email
            </a>
            .
          </p>
        </div>
        <div className="work-grid-expanded">
          <div>
            <h3 className="section-title">Tools</h3>
            <div className="tag-group">
              <span className="tag">Figma</span>
              <span className="tag">Photoshop</span>
              <span className="tag">Blender</span>
              <span className="tag">Illustrator</span>
              <span className="tag">After Effects</span>
            </div>
          </div>
          <div>
            <h3 className="section-title">Development</h3>
            <div className="tag-group">
              <span className="tag">JavaScript</span>
              <span className="tag">TypeScript</span>
              <span className="tag">React</span>
              <span className="tag">Next.js</span>
              <span className="tag">HTML</span>
              <span className="tag">CSS</span>
            </div>
          </div>
          <div>
            <h3 className="section-title">Programming Languages</h3>
            <div className="tag-group">
              <span className="tag">Python</span>
              <span className="tag">JavaScript</span>
              <span className="tag">C/C++</span>
              <span className="tag">Java</span>
            </div>
          </div>
          <div>
            <h3 className="section-title">Frontend Technologies</h3>
            <div className="tag-group">
              <span className="tag">React.js</span>
              <span className="tag">Next.js</span>
              <span className="tag">Bootstrap</span>
              <span className="tag">jQuery</span>
              <span className="tag">EJS</span>
            </div>
          </div>
          <div>
            <h3 className="section-title">Backend & Frameworks</h3>
            <div className="tag-group">
              <span className="tag">Node.js</span>
              <span className="tag">Express.js</span>
              <span className="tag">Flask</span>
              <span className="tag">FastAPI</span>
              <span className="tag">PostgreSQL</span>
              <span className="tag">Three.js</span>
            </div>
          </div>
        </div>

        <hr className="work-separator" />

        <h2 className="section-title">Development</h2>

        <div className="project-card">
          <div className="project-media">
            <Image
              src="/work/masterclass.png"
              alt="MasterClass platform"
              width={320}
              height={240}
            />
          </div>

          <div className="project-content">
            <h3 className="project-title">MasterClass</h3>

            <p className="project-desc">
              A full-stack course platform where creators can sell courses and
              users can enroll, pay, and learn in real time.
            </p>

            <p className="project-desc">
              I designed and built the entire system end to end: authentication,
              payments, caching, and real-time sync, and deployed it to
              production.
            </p>

            <p className="project-links">
              Built with{" "}
              <strong>Next.js, TypeScript, Prisma, Stripe, Redis</strong>. Live
              on production.
            </p>

            <div className="project-actions">
              <a
                href="https://stripe-courses-git-main-yash-guptas-projects-3b3b56f0.vercel.app/"
                target="_blank"
                className="btn primary"
              >
                live demo
              </a>
              <a
                href="https://github.com/YASHGUPTA1161/StripeCourses"
                target="_blank"
                className="btn"
              >
                source code
              </a>
            </div>
          </div>
        </div>

        <div className="project-card">
          <div className="project-media">
            <Image
              src="/work/vibe.png"
              alt="VibeCode AI generator"
              width={320}
              height={240}
            />
          </div>

          <div className="project-content">
            <h3 className="project-title">VibeCode</h3>

            <p className="project-desc">
              An AI-powered code generator that turns your ideas into working Next.js projects. Just describe what you want to build, and it creates the entire codebase for you.
            </p>

            <p className="project-desc">
              I built a smart system with a chat interface where you can talk to the AI, see live code previews, and watch your project come together in real time. It handles everything from file creation to terminal commands in a safe sandbox environment.
            </p>

            <p className="project-links">
              Built with{" "}
              <strong>Next.js, TypeScript, Prisma, tRPC, Inngest, E2B Sandboxes</strong>. Live and ongoing.
            </p>

            <div className="project-actions">
              <a
                href="https://vibe-two-rho.vercel.app/"
                target="_blank"
                className="btn primary"
              >
                live demo
              </a>
              <a
                href="https://github.com/YASHGUPTA1161/Vibe"
                target="_blank"
                className="btn"
              >
                source code
              </a>
            </div>
          </div>
        </div>

        <hr className="work-separator" />

        <div className="other-projects">
          <h2 className="section-title">Other dev projects:</h2>
          <ul className="project-list">
            <li>This website!</li>
            <li>that's it for now, there are some more projects i'm working on in the background that i'll release soon :)</li>
          </ul>
          <p className="github-link">
            See more on{" "}
            <a
              href="https://github.com/YASHGUPTA1161"
              target="_blank"
              className="email-link"
            >
              GitHub
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};
export default Work;
