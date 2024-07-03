import React from "react";
import "./clinics.css";
import ClinicCard from "../../components/ClinicCard/CliniCard";
import Footer from "../../components/Footer/footer";
import Aos from "aos";
import "aos/dist/aos.css";

const Clinics = () => {
  const clinicData = [
    {
      name: " Paedodontics Cinic",
      description: "Specializing in dental care for children, ensuring gentle and friendly treatments.",
      photo:
        "https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2xpbmljfGVufDB8fDB8fHww",
    },
    {
      name: "Oral Surgery & Local Anesthesia Clinic",
      description: " Dedicated to advanced oral surgery and effective local anesthesia techniques.",
      photo:
        "https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2xpbmljfGVufDB8fDB8fHww",
    },
    {
      name: "Conservative Dentistry Clinic ",
      description: "Utilizing modern technology to preserve natural teeth and maintain oral health.",
      photo:
        "https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2xpbmljfGVufDB8fDB8fHww",
    },
    {
      name: " Prosthodontics Clinic",
      description: "Offering expert care in replacing missing teeth and restoring dental function. ",
      photo:
        "https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2xpbmljfGVufDB8fDB8fHww",
    },
    {
      name: "Periodontology Clinic ",
      description: " Specializing in the prevention, diagnosis, and treatment of periodontal disease. ",
      photo:
        "https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2xpbmljfGVufDB8fDB8fHww",
    },
    {
      name: "Orthodontics Cinic",
      description: "Specializing in correcting dental irregularities and creating beautiful smiles.",
      photo:
        "https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2xpbmljfGVufDB8fDB8fHww",
    },
  ];

  return (
    <div>
      <div className="clinicimage">
        <div className="smile">
          <h1 data-aos="fade-right" data-aos-duration="1500" align="left">
            {" "}
            Arab American University Clinics{" "}
          </h1>
          <h1 data-aos="fade-right" data-aos-duration="1500" align="left">
            {" "}
            Your Best Choice{" "}
          </h1>
        </div>
      </div>
      <ClinicCard clinicData={clinicData} />
      <Footer />
    </div>
  );
};

export default Clinics;
