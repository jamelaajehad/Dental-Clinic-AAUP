import React from "react";
import './clinics.css'; 
import ClinicCard from "../../components/ClinicCard/CliniCard";
import Footer from "../../components/Footer/footer";
import Aos from "aos";
import "aos/dist/aos.css";

const Clinics = () => {
    const clinicData = [
        { name: " Paedodontics Cinic", address: "123 Smile St.",  description: "We offer the best dental care in town." },
        { name: "Oral Surgery & Local Anesthesia Clinic", address: "456 Bright Ave.",  description: "Your smile is our priority." },
        { name: "Conservative Dentistry Clinic ", address: "789 Healthy Rd.",  description: "Modern technology for your dental health." },
        { name: " Prosthodontics Clinic", address: "321 Family Blvd.", description: "Friendly dental care for the whole family." },
        { name: "Periodontology Clinic ", address: "654 Downtown St.",description: "Conveniently located in the heart of the city." },
        { name: "Orthodontics Cinic", address: "654 Downtown St.",description: "Conveniently located in the heart of the city." }
    ];

    return(
       
        <div> 
        <div  className="clinicimage">
        <div  className="smile">  
        <h1 data-aos="fade-right" data-aos-duration="1500" align="left">  Arab American University Clinics </h1>
        <h1 data-aos="fade-right" data-aos-duration="1500" align="left">  Your Best Choice </h1>
        </div>
         </div>
         <ClinicCard clinicData={clinicData} /> 
         <Footer/>
         </div>
    ) ;
};

export default Clinics ;
