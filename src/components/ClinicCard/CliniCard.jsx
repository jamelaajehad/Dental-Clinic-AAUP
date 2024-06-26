import React from "react";
import "./ClinicCard.css";
import "aos/dist/aos.css";

const ClinicCard = ({ clinicData }) => {
  return (
    <div className="clinic-home">
      <h1 align="center" className="clinic-title">
        Our Clinics
      </h1>
      <p align="center"  className="clinic-text">
        Our university offers diverse dental clinics, providing expert care from
        pediatric dentistry to oral surgery and orthodontics. Discover our
        high-quality services for optimal oral health.
      </p>
      <div className="clinics-container">
        {clinicData.map((clinic, index) => (
          <div
            data-aos="zoom-in"
            data-aos-duration="2000"
            className="clinic-card"
            key={index}
          >
            <div className="image-container">
              <img
                src={clinic.photo}
                alt={clinic.name}
                className="clinic-photo"
              />
              <div className="overlay">
                <div className="clinic-info">
                  <h5>{clinic.name}</h5>
                  <p>{clinic.address}</p>
                  <p>{clinic.description}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClinicCard;
