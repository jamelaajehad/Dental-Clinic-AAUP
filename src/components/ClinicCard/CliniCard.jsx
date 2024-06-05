import React from "react";
import './ClinicCard.css';
import Aos from "aos";
import "aos/dist/aos.css";

const ClinicCard = ({ clinicData }) => {
    return (
        <div className="clinic-home">  
        <h1  align="center" className="clinic-title">Our Clinics</h1>
        <p align ="center" className="clinic-text">Our university offers diverse dental clinics, providing expert care from pediatric dentistry to oral surgery and orthodontics. Discover our high-quality services for optimal oral health. </p>
        <div  className="clinics-container">
                {clinicData.map((clinic, index) => (
                    <div data-aos="zoom-in-up" data-aos-duration="1500" className="clinic-card" key={index}>
                        <h4>{clinic.name}</h4>
                        <p>{clinic.address}</p>
                        <p>{clinic.description}</p>
                    </div>
                    
                ))}
            </div>
        </div>
       
    );
};

export default ClinicCard;