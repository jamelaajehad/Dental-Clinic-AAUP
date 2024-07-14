import { useState } from "react";
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaClock } from "react-icons/fa";
import "./contact.css";
import Footer from "../../components/Footer/footer";
const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="contact-us">
      <div className="animated-background"></div>
      <main>
        <h1 className="contact-us-h1">Contact Us</h1>
        <p className="firt-sentence-contact-us">
          <span>We Care About You and Your Smile </span>
          At the Dental Clinic of the Arab American University, we strive to
          provide the best dental care. Our team of specialized doctors is here
          to assist you with everything you need. Do not hesitate to contact us
          to schedule an appointment or to ask any questions you may have.
        </p>
        <div className="contact-info">
          <div className="info-item">
            <div className="icon-bg">
              <FaEnvelope className="icon" />
            </div>

            <span>Email Address</span>
            <p>shockry.mustafa@aaup.edu</p>
          </div>
          <div className="info-item">
            <div className="icon-bg">
              <FaPhone className="icon" />
            </div>
            <span>Phone Number</span>
            <p>2418888-04</p>
          </div>
          <div className="info-item">
            <div className="icon-bg">
              <FaMapMarkerAlt className="icon" />
            </div>
            <span>Office Location</span>
            <p>Jenin - Palestine</p>
          </div>
          <div className="info-item">
            <div className="icon-bg">
              <FaClock className="icon" />
            </div>
            <span>Work Day</span>
            <p>Sun - Wed: 09:00 - 17:00</p>
          </div>
        </div>
        <div className="contact-form-container">
          <div className="form-section">
            <h2 className="form-h2">How can we help ? Contact us now </h2>
            <h3 className="form-h3">Get In Touch With Us</h3>
            <p className="form-p">
              "We look forward to hearing from you through our website. Leave
              your message and we'll get back to you soon."
            </p>
            <form className="contact-us-form" onSubmit={handleSubmit}>
              <div className="input-group">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Name"
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Email"
                />
              </div>
              <div className="input-group">
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  placeholder="Phone Number"
                />
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  placeholder="Subject"
                />
              </div>
              <textarea
                name="message"
                placeholder="Message"
                className="contact-us-textarea"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
              <button type="submit" className="contact-us-button">
                Send Message
              </button>
            </form>
          </div>
          <div className="image-section">
            <div className="image-wrapper">
              <img
                src="https://www.aaup.edu/sites/default/files/styles/scaled__750x501_/public/gallery/albums/student-life/2023-02/27600063153083137225148206720145336190611182n.jpg"
                alt="Doctors"
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
