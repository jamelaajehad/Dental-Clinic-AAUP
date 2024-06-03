import React from "react";
import './footer.css';
import { FaMapMarkerAlt,FaEnvelope, FaPhone} from 'react-icons/fa';
const Footer = () => {
  return (
    
    <div className="footer-container2 border"  >
       <div className="Title"> 
        <p>DENTAL CLINIC AAUP </p>
        </div>
       <div className="footer"> 
       <div className="location">
         <FaMapMarkerAlt className="icon"/>
         <p className="p">Jenin, Palestine</p>
        </div>
        <div className="email">
          <FaEnvelope className="icon2" />
          <p className="p2">example@example.com</p>
        </div>
        <div className="phone">
           <FaPhone className="icon3" />
           <p className="p3">Phone: +1234567890</p>
        </div>
        </div>
        <div className="footer2"> 
        <div className="links">
          <a href="/#" className="link">Home</a>
          <a href="/services" className="link">Services</a>
          <a href="/Contact" className="link">Contact</a>
        </div>
      </div>
      <hr className="divider"/>
      <div className="footer-below">
        <div className="footer-copyright">
          <p>
          </p>
        </div>
      </div>
     </div>
     
    ) ;
};
export default Footer; 