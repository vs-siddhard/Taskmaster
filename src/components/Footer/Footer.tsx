import React from 'react';
import { FiHeart, FiGithub, FiKeyboard } from 'react-icons/fi';
import './Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <p className="footer-text">
            Built with <FiHeart className="heart-icon" size={14} /> for productivity enthusiasts
          </p>
        </div>
        
        <div className="footer-section">
          <div className="footer-shortcuts">
            <span className="shortcuts-title">
              <FiKeyboard size={14} />
              Quick Actions:
            </span>
            <div className="shortcuts-list">
              <span className="shortcut">
                <kbd>Enter</kbd> Add task
              </span>
              <span className="shortcut">
                <kbd>/</kbd> Search
              </span>
              <span className="shortcut">
                <kbd>Esc</kbd> Cancel
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;