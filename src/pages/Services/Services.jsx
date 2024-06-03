import React, { useState } from "react";
import "./services.css";

const Services = () => {
  const [expandedService, setExpandedService] = useState(null);

  const toggleService = (index) => {
    if (expandedService === index) {
      setExpandedService(null);
    } else {
      setExpandedService(index);
    }
  };

  return (
    <div className="services-container">
      <h2>Our Services</h2>
      <div className="service" onClick={() => toggleService(1)}>
        <h3>Radiography </h3>
        {expandedService === 1 && (
          <p>
            Radiography is an essential part of providing healthcare in the
            field of dentistry. It is used to diagnose problems with teeth,
            gums, and jaws accurately. It enables the dentist to see parts that
            are not visible to the naked eye, making it easier to identify
            issues and develop an effective treatment plan.
          </p>
        )}
        {expandedService !== 1 && (
          <button
            className="read-more"
            onClick={(e) => {
              e.stopPropagation();
              toggleService(1);
            }}
          >
            Read more
          </button>
        )}
      </div>
      <div className="service" onClick={() => toggleService(2)}>
        <h3>Teeth Cleaning and Prevention </h3>
        {expandedService === 2 && (
          <p>
            It is essential for maintaining oral and dental health. It includes
            removing tartar and plaque to prevent cavities and gum inflammation.
            It involves guiding the patient on proper oral and dental care
            practices at home.
          </p>
        )}
        {expandedService !== 2 && (
          <button
            className="read-more"
            onClick={(e) => {
              e.stopPropagation();
              toggleService(2);
            }}
          >
            Read more
          </button>
        )}
      </div>
      <div className="service" onClick={() => toggleService(3)}>
        <h3>Fillings and Caries Treatment </h3>
        {expandedService === 3 && (
          <p>
            It aims to repair damaged teeth due to cavities or decay. It
            includes removing damaged tissue and filling the gaps using fillings
            that restore the natural function and shape of the tooth.
          </p>
        )}
        {expandedService !== 3 && (
          <button
            className="read-more"
            onClick={(e) => {
              e.stopPropagation();
              toggleService(3);
            }}
          >
            Read more
          </button>
        )}
      </div>
      <div className="service" onClick={() => toggleService(4)}>
        <h3>Orthodontic Services </h3>
        {expandedService === 4 && (
          <p>
            It addresses correcting the position of teeth and jaws to achieve a
            proper bite and aesthetics. It uses fixed or removable devices to
            gradually move teeth to their correct positions.
          </p>
        )}
        {expandedService !== 4 && (
          <button
            className="read-more"
            onClick={(e) => {
              e.stopPropagation();
              toggleService(4);
            }}
          >
            Read more
          </button>
        )}
      </div>
    </div>
  );
};

export default Services;
