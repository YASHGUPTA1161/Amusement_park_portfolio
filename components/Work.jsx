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
        
        {/* Work Experience Section */}
        <div className="work-experience-section">
          <h3 className="section-title-main">WORK EXPERIENCE</h3>
          
          <div className="experience-card">
            <div className="experience-header">
              <h4 className="company-name">Grey Hatch Technologies Pvt. Ltd.</h4>
              <span className="role-name">Generative AI Intern</span>
            </div>
            <p className="experience-description">
              Worked on production-oriented AI features, fine-tuning Hugging Face models for sentiment analysis and image generation, deployed via Gradio on AWS SageMaker. Built an AI Accountant Manager using CrewAI agents to automate financial reporting. Developed a LangChain-based RAG chatbot and automation workflows (n8n, Selenium) for data scraping and lead generation.
            </p>
          </div>

          <div className="experience-card">
            <div className="experience-header">
              <h4 className="company-name">Bharat Intern</h4>
              <span className="role-name">Web Developer Intern</span>
            </div>
            <p className="experience-description">
              Built complete, deployable frontend projects using HTML, CSS, and JavaScript. Created a responsive Netflix-style homepage focusing on layout and UI behavior. Developed a weather forecast website with real-time API data and a temperature converter to improve interactivity.
            </p>
          </div>

          <div className="experience-card">
            <div className="experience-header">
              <h4 className="company-name">DetachedMeta LLP</h4>
              <span className="role-name">Unreal Engine Developer Intern</span>
            </div>
            <p className="experience-description">
              Built a detailed 3D room environment using Unreal Engine, working with meshes, materials, and node-based material graphs to control surface textures like metallic and rock finishes. Focused on lighting, reflections, and spatial composition to achieve a realistic and visually polished scene.
            </p>
          </div>
        </div>


        <h2 className="section-title-main">SKILLS</h2>
        <div className="work-grid-expanded">
          <div>
            <h3 className="section-title">Languages</h3>
            <div className="tag-group">
              <span className="tag">Python</span>
              <span className="tag">JavaScript</span>
              <span className="tag">TypeScript</span>
            </div>
          </div>
          
          <div>
            <h3 className="section-title">Backend</h3>
            <div className="tag-group">
              <span className="tag">Node.js</span>
              <span className="tag">FastAPI</span>
              <span className="tag">REST APIs</span>
              <span className="tag">Prisma</span>
            </div>
          </div>
          
          <div>
            <h3 className="section-title">Frontend</h3>
            <div className="tag-group">
              <span className="tag">React</span>
              <span className="tag">Next.js</span>
            </div>
          </div>
          
          <div>
            <h3 className="section-title">Databases</h3>
            <div className="tag-group">
              <span className="tag">PostgreSQL</span>
              <span className="tag">Redis</span>
              <span className="tag">MongoDB</span>
            </div>
          </div>
          
          <div>
            <h3 className="section-title">Automation</h3>
            <div className="tag-group">
              <span className="tag">Selenium</span>
              <span className="tag">n8n</span>
            </div>
          </div>
          
          <div>
            <h3 className="section-title">Deployment</h3>
            <div className="tag-group">
              <span className="tag">Vercel</span>
              <span className="tag">AWS (EC2, S3)</span>
              <span className="tag">Docker (basic)</span>
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
