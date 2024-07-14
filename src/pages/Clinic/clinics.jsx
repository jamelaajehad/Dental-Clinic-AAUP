// import React from "react";
// import "./clinics.css";
// import ClinicCard from "../../components/ClinicCard/CliniCard";
// import Footer from "../../components/Footer/footer";
// import Aos from "aos";
// import "aos/dist/aos.css";

// const Clinics = () => {
//   const clinicData = [
//     {
//       name: " Paedodontics Cinic",
//       description: "Specializing in dental care for children, ensuring gentle and friendly treatments.",
//       photo:
//         "https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2xpbmljfGVufDB8fDB8fHww",
//     },
//     {
//       name: "Oral Surgery & Local Anesthesia Clinic",
//       description: " Dedicated to advanced oral surgery and effective local anesthesia techniques.",
//       photo:
//         "https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2xpbmljfGVufDB8fDB8fHww",
//     },
//     {
//       name: "Conservative Dentistry Clinic ",
//       description: "Utilizing modern technology to preserve natural teeth and maintain oral health.",
//       photo:
//         "https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2xpbmljfGVufDB8fDB8fHww",
//     },
//     {
//       name: " Prosthodontics Clinic",
//       description: "Offering expert care in replacing missing teeth and restoring dental function. ",
//       photo:
//         "https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2xpbmljfGVufDB8fDB8fHww",
//     },
//     {
//       name: "Periodontology Clinic ",
//       description: " Specializing in the prevention, diagnosis, and treatment of periodontal disease. ",
//       photo:
//         "https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2xpbmljfGVufDB8fDB8fHww",
//     },
//     {
//       name: "Orthodontics Cinic",
//       description: "Specializing in correcting dental irregularities and creating beautiful smiles.",
//       photo:
//         "https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2xpbmljfGVufDB8fDB8fHww",
//     },
//   ];

//   return (
//     <div>
//       <div className="clinicimage">
//         <div className="smile">
//           <h1 data-aos="fade-right" data-aos-duration="1500" align="left">
//             {" "}
//             Arab American University Clinics{" "}
//           </h1>
//           <h1 data-aos="fade-right" data-aos-duration="1500" align="left">
//             {" "}
//             Your Best Choice{" "}
//           </h1>
//         </div>
//       </div>
//       <ClinicCard clinicData={clinicData} />
//       <Footer />
//     </div>
//   );
// };

// export default Clinics;
import React from 'react';
import './clinics.css';
import ClinicCard from '../../components/ClinicCard/CliniCard';
import Footer from '../../components/Footer/footer';
import Aos from 'aos';
import 'aos/dist/aos.css';

const Clinics = () => {
  const clinicData = [
    {
      name: ' Paedodontics Clinic',
      content:
        'The Paedodontics Clinic is one of the specialized clinics in providing oral health care for children. The clinic aims to create a safe and comfortable environment for children to ensure a positive experience during their dental visits. The clinic’s services include:',
      points: [
        'Providing regular dental and gum check-ups to ensure oral health',
        'Offering fillings for teeth affected by decay using child-safe materials',
        'Cleaning teeth to remove plaque and tartar, helping prevent tooth decay and gum diseases',
      ],
      description:
        'Specializing in dental care for children, ensuring gentle and friendly treatments.',
      photo: 'https://www.dentevim.com/upload/pedodontii.jpg',
    },
    {
      name: 'Oral Surgery & Local Anesthesia Clinic',
      content:
        'Our Oral Surgery & Local Anesthesia Clinic specializes in providing comprehensive surgical care and pain management for a variety of dental conditions. We are committed to ensuring our patients receive the highest quality care in a comfortable and safe environment. Our services include:',
      points: [
        'Expert handling of simple to complex extractions with precision and care.',
        'Specialized removal of impacted or problematic wisdom teeth for a smooth recovery.',
        'Specialized care for TMJ disorders to relieve pain and improve jaw function.',
      ],
      description:
        ' Dedicated to advanced oral surgery and effective local anesthesia techniques.',
      photo:
        'https://www.nigms.nih.gov/education/PublishingImages/featured-topics/anesthesia/anesthesia-featured-topic-landing-page-image.jpg',
    },
    {
      name: 'Conservative Dentistry Clinic ',
      content:
        'The Conservative Dentistry Clinic is dedicated to the preservation and restoration of your natural teeth. Our expert team focuses on minimally invasive treatments to maintain dental health and aesthetics. Key services include:',
      points: [
        'Comprehensive care for cavities using advanced techniques to ensure the longevity of your teeth.',
        'Effective and painless procedures to save infected or damaged teeth, preventing extractions.',
        'High-quality, natural-looking fillings that restore function and appearance.',
      ],
      description:
        'Utilizing modern technology to preserve natural teeth and maintain oral health.',
      photo:
        'https://family-dent.rs/images/usluge/konzervativna/carousel/konzervativa1.jpg',
    },
    {
      name: ' Prosthodontics Clinic',
      content:
        'The Prosthodontics Clinic specializes in the restoration and replacement of teeth to enhance both function and aesthetics. Our highly skilled team uses the latest techniques and materials to deliver exceptional prosthodontic care. Key services include:',
      points: [
        'Custom-made crowns to restore damaged or weakened teeth, ensuring a natural look and feel.',
        ' Fixed dental prosthetics to replace missing teeth, preventing shifting and maintaining proper alignment.',
        'High-quality removable dentures that provide comfort, functionality, and a natural appearance.',
      ],
      description:
        'Offering expert care in replacing missing teeth and restoring dental function. ',
      photo:
        'https://makowski-zurek.pl/wp-content/uploads/2023/04/artificial-jaw-dentist-s-office_Easy-Resize.com_.jpg ',
    },
    {
      name: 'Periodontology Clinic ',
      content:
        'The Periodontology Clinic specializes in the prevention, diagnosis, and treatment of periodontal (gum) diseases and conditions affecting the supporting structures of teeth. Our clinic offers comprehensive services aimed at maintaining healthy gums and preserving teeth. Key services include:',
      points: [
        'Restorative procedures to repair receding gums and prevent tooth root exposure.',
        'Deep cleaning procedures to remove plaque and tartar buildup from below the gum line, promoting gum health.',
        'Regular check-ups and cleanings to monitor gum health and prevent disease progression.',
      ],
      description:
        ' Specializing in the prevention, diagnosis, and treatment of periodontal disease. ',
      photo:
        'https://cdn.turkiyedental.com/images/periodontology-img-04.jpg?format=webp',
    },
    {
      name: 'Orthodontics Clinic',
      content:
        'The Orthodontics Clinic specializes in correcting dental and facial irregularities, enhancing both aesthetic appearance and oral function. Our clinic offers a range of advanced orthodontic treatments tailored to each patients needs, including:',
      points: [
        'Traditional metal braces and modern alternatives like ceramic braces or lingual braces.',
        'Custom-made clear aligners (e.g., Invisalign) for discreet orthodontic treatment.',
        'Devices to correct jaw growth discrepancies and improve bite alignment.',
      ],
      description:
        'Specializing in correcting dental irregularities and creating beautiful smiles.',
      photo:
        'https://bracesandmore.in/wp-content/uploads/2016/11/banner-image3.jpg',
    },
  ];

  return (
    <div>
      <div className="clinicimage">
        <div className="smile">
          <h1 data-aos="fade-right" data-aos-duration="1500" align="left">
            {' '}
            Arab American University Clinics{' '}
          </h1>
          <h1 data-aos="fade-right" data-aos-duration="1500" align="left">
            {' '}
            Your Best Choice{' '}
          </h1>
        </div>
      </div>
      <ClinicCard clinicData={clinicData} />
      <Footer />
    </div>
  );
};

export default Clinics;
