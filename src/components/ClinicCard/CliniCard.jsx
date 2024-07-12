// import React from "react";
// import "./ClinicCard.css";
// import "aos/dist/aos.css";

// const ClinicCard = ({ clinicData }) => {
//   return (
//     <div className="clinic-home">
//       <h1 align="center" className="clinic-title">
//         Our Clinics
//       </h1>
//       <p align="center"  className="clinic-text">
//         Our university offers diverse dental clinics, providing expert care from
//         pediatric dentistry to oral surgery and orthodontics. Discover our
//         high-quality services for optimal oral health.
//       </p>
//       <div className="clinics-container">
//         {clinicData.map((clinic, index) => (
//           <div
//           data-aos="fade-down"
          
//           data-aos-duration="1500"
//             className="clinic-card"
//             key={index}
//           >
//             <div className="image-container">
//               <img
//                 src={clinic.photo}
//                 alt={clinic.name}
//                 className="clinic-photo"
//               />
//               <div className="overlay">
//                 <div className="clinic-info">
//                   <h5>{clinic.name}</h5>
//                   <p>{clinic.address}</p>
//                   <p>{clinic.description}</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ClinicCard;

import React from 'react';
import './ClinicCard.css';
import 'aos/dist/aos.css';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const ClinicCard = ({ clinicData }) => {
  return (
    <div className="clinic-home">
      <h1 className="clinic-title" align="center">
        Our Clinics
      </h1>
      <p className="clinic-text" align="center">
        Our university offers diverse dental clinics, providing expert care from
        pediatric dentistry to oral surgery and orthodontics. Discover our
        high-quality services for optimal oral health.
      </p>
      <div className="clinics-container">
        {clinicData.length > 0 && (
          <Carousel
            showThumbs={false}
            showStatus={false}
            useKeyboardArrows
            autoPlay
            infiniteLoop
            interval={4000}
            transitionTime={3000}
            showArrows
            showIndicators={false}
            stopOnHover
            swipeable
            autoFocus
          >
            {clinicData.map((clinic, index) => (
              <div
                data-aos="zoom-in"
                data-aos-duration="2000"
                className="clinic-card"
                key={index}
              >
                <div className="image-container">
                  <div className="image-section">
                    <div className="image-wrapper">
                      <img
                        src={clinic.photo}
                        alt={clinic.name}
                        className="clinic-photo"
                      />
                    </div>
                  </div>
                  <div className="clinic-info">
                    <h1>{clinic.name}</h1>
                    <p>{clinic.content}</p>
                    {clinic.points && (
                      <ul>
                        {clinic.points.map((point, idx) => (
                          <li key={idx}>{point}</li>
                        ))}
                      </ul>
                    )}
                    <p>" {clinic.description} "</p>
                  </div>
                </div>
              </div>
            ))}
          </Carousel>
        )}
      </div>
    </div>
  );
};

export default ClinicCard; 