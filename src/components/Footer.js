
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Millenium Mitra Mandad</h3>
            <p>Your trusted saving platform.</p>
          </div>
          {/* <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="/home">Home</a></li>
              <li><a href="/login">Login</a></li>
            </ul>
          </div> */}
          <div className="footer-section">
            <h4>Contact</h4>
            {/* <p>Email: support@mitramandad.com</p> */}
            <p>Phone: +91 8733095566</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {currentYear} Millenium Mitra Mandad. All rights reserved.</p>
          <p>Developed by <a href="https://www.jimishravat.in" target="_blank" rel="noopener noreferrer">Jimish Ravat</a></p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
