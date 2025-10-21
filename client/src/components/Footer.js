import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>BookSphere</h3>
          <p>AI-Powered Group-Based Academic E-Book Management System</p>
        </div>
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/dashboard">Dashboard</a></li>
            <li><a href="/profile">Profile</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Resources</h4>
          <ul>
            <li><a href="/help">Help Center</a></li>
            <li><a href="/terms">Terms of Service</a></li>
            <li><a href="/privacy">Privacy Policy</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Contact Us</h4>
          <p>Email: support@booksphere.com</p>
          <p>Phone: +1 (555) 123-4567</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} BookSphere. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;