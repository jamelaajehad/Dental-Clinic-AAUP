// import React from "react";
// import './footer.css';
// import { FaMapMarkerAlt,FaEnvelope, FaPhone} from 'react-icons/fa';
// const Footer = () => {
//   return (
    
//     <div className="footer-container2 border"  >
//        <div className="Title"> 
//         <p>DENTAL CLINIC AAUP </p>
//         </div>
//        <div className="footer"> 
//        <div className="location">
//          <FaMapMarkerAlt className="icon"/>
//          <p className="p">Jenin, Palestine</p>
//         </div>
//         <div className="email">
//           <FaEnvelope className="icon2" />
//           <p className="p2">example@example.com</p>
//         </div>
//         <div className="phone">
//            <FaPhone className="icon3" />
//            <p className="p3">Phone: +1234567890</p>
//         </div>
//         </div>
//         <div className="footer2"> 
//         <div className="links">
//           <a href="/#" className="link">Home</a>
//           <a href="/services" className="link">Services</a>
//           <a href="/Contact" className="link">Contact</a>
//         </div>
//       </div>
//       <hr className="divider"/>
//       <div className="footer-below">
//         <div className="footer-copyright">
//           <p>
//           </p>
//         </div>
//       </div>
//      </div>
     
//     ) ;
// };
// export default Footer; 

import { useEffect, useState } from "react";
import './footer.css';
import { FaMapMarkerAlt, FaEnvelope, FaPhone, FaFacebook, FaInstagram, FaTwitter, FaArrowUp } from 'react-icons/fa';

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <div> 
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-title">
            <h1 className="title-text">DENTAL CLINIC AAUP</h1>
          </div>
          <div className="footer-columns">
            <div className="footer-column">
              <h3 className="column-heading">Contact Us</h3>
              <div className="footer-section">
                <FaMapMarkerAlt className="icon"/>
                <p>Jenin - Palestine<br/>P.O. Box 240, Jenin, 13 Zababdeh</p>
              </div>
              <div className="footer-section">
                <FaEnvelope className="icon" />
                <p>info@aaup.edu</p>
              </div>
              <div className="footer-section">
                <FaPhone className="icon" />
                <p>Phone: 00970-4-2418888</p>
              </div>
            </div>
            <div className="footer-column">
              <h3 className="column-heading">About Us</h3>
              <p className="column-text">Dental Clinic AAUP offers comprehensive dental care services with state-of-the-art technology and a dedicated team of professionals. We are committed to providing the best dental care in Palestine.</p>
            </div>
            <div className="footer-column">
              <h3 className="column-heading">Quick Links</h3>
              <div className="footer-links">
                <a href="/#" className="link">Home</a>
                <a href="/clinics" className="link">Our Clinics</a>
                <a href="/contact" className="link">Contact</a>
              </div>
            </div>
            <div className="footer-column">
              <h3 className="column-heading">Follow Us</h3>
              <div className="footer-social">
                <a href="https://www.facebook.com" className="social-link"><FaFacebook className="social-icon" /></a>
                <a href="https://www.instagram.com" className="social-link"><FaInstagram className="social-icon" /></a>
                <a href="https://www.twitter.com" className="social-link"><FaTwitter className="social-icon" /></a>
              </div>
            </div>
          </div>
          <div className={`back-to-top ${isVisible ? 'visible' : ''}`} onClick={scrollToTop}>
            <FaArrowUp />
          </div>
        </div>
        <hr className="divider"/>
        <div className="footer-below">
          <p>&copy; 2024 Dental Clinic AAUP. All rights reserved.</p>
        </div>
      </div>
    </div> 
  );
};

export default Footer;
