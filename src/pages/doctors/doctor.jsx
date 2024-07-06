// import React from "react";
// import { useNavigate } from 'react-router-dom';
// import './doctor.css';
// import Footer from "../../components/Footer/footer";
// import doctor1 from  '../../Asset/doctor-images/doctor1.jpg';
// import doctor2 from '../../Asset/doctor-images/doctor2.jpg';
// import doctor3 from '../../Asset/doctor-images/doctor3.jpg';
// import doctor4 from '../../Asset/doctor-images/doctor4.jpg';
// import doctor5 from '../../Asset/doctor-images/doctor5.jpg';
// import doctor6 from '../../Asset/doctor-images/doctor6.jpg';
// import doctor7 from '../../Asset/doctor-images/doctor7.jpg';
// import doctor8 from '../../Asset/doctor-images/doctor8.jpg';
// import doctor9 from '../../Asset/doctor-images/doctor9.jpg';
// import doctor10 from '../../Asset/doctor-images/doctor10.jpg';
// import doctor11 from '../../Asset/doctor-images/doctor11.jpg';

// const doctorsData = [
//     { name: 'Dr. Rana Ali', description: 'Fourth year student', image: doctor1 },
//     { name: 'Dr. mohammed samer', description: 'fifth year student', image: doctor2 },
//     { name: 'Dr. ahmad taleb', description: 'fifth year student', image: doctor3 },
//     { name: 'Dr. rema saleh', description: 'fifth year student', image: doctor4 },
//     { name: 'Dr. sami iyad', description: 'fifth year student', image: doctor5 },
//     { name: 'Dr. lana murad', description: 'fourth year student', image: doctor6 },
//     { name: 'Dr. dana salah', description: 'fifth year student', image: doctor7 },
//     { name: 'Dr. rami ayman', description: 'fourth year student', image: doctor8 },
//     { name: 'Dr. eman jehad', description: 'fifth year student', image: doctor9 },
//     { name: 'Dr. omar maher', description: 'fourth year student', image: doctor10 },
//     { name: 'Dr. dana salah', description: 'fifth year student', image: doctor11 },
// ];

// const Doctor = () => {
//     const navigate = useNavigate();
//     const handleButtonClick = (doctorIndex) => {
//         navigate(`/doctors/${doctorIndex}`);
//       };
//     return (
//       <div className="main border"> 
//       <div className="backgroundDoc"> 
//         <p> </p>
//         </div>
//         <div className="doctors">
//             <h2> Our Dentists: </h2>
//             <p className="SecTitle">Explore and schedule with the ideal dentist for you, effortlessly.</p>
//             <div className="ContainerDoc">
//                 {doctorsData.map((doctor, doctorIndex) => (
//                     <div className="cards-doc" key={doctorIndex}>
//                         <div className="card-image-container">
//                             <img src={doctor.image} alt="#" style={{ width: '95%', height: '55%' }} /> 
//                         </div>
//                         <p className="title1">{doctor.name}</p>
//                         <p className="des1">{doctor.description}</p>
//                         <button className="button1" onClick={() => handleButtonClick(doctorIndex)}>Book Now</button>
//                     </div>
//                 ))}
//             </div>
//         </div>
//         < Footer/> 
//      </div>
//     );
// };

// export default Doctor;