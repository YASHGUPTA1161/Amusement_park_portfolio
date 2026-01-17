import React from "react";
import { useDragableWindow } from "./DragableWindow";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import RedditIcon from "@mui/icons-material/Reddit";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";

const Links = ({ onClose, positionY = 32, positionX = 50 }) => {
  const dragRef = useDragableWindow();
  return (
    <div
      ref={dragRef}
      id="links-window"
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
      <div id="links-windowheader" className="titlebar">
        <span>Links</span>
        <button className="close-btn" onClick={onClose}>
          ×
        </button>
      </div>
      <div className="window-body">
        {/* links content */}
        <div>
          <div className="links-grid">
            <div className="link-item">
              <GitHubIcon sx={{ fontSize: 40 }} />
              <span className="link-label">github</span>
            </div>
            <div className="link-item">
              <LinkedInIcon sx={{ fontSize: 40 }} />
              <span className="link-label">linkedin</span>
            </div>
            <div className="link-item">
              <TwitterIcon sx={{ fontSize: 40 }} />
              <span className="link-label">twitter</span>
            </div>
            <div className="link-item">
              <RedditIcon sx={{ fontSize: 40 }} />
              <span className="link-label">reddit</span>
            </div>
            <div className="link-item">
              <InstagramIcon sx={{ fontSize: 40 }} />
              <span className="link-label">instagram</span>
            </div>
            <div className="link-item">
              <PinterestIcon sx={{ fontSize: 40 }} />
              <span className="link-label">pinterest</span>
            </div>
            <div className="link-note">
              clicking any of the links will open a new tab!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Links;
