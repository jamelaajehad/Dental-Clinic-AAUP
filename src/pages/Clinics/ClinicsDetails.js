
import React  from "react";
import './ClinicsDetails.css';
import Aos from "aos";
import 'aos/dist/aos.css';
import { FaTooth, FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';
import { FaArrowRight } from 'react-icons/fa';
import { useEffect } from 'react';
import {useNavigate} from "react-router-dom"; 
import Footer from "../../components/Footer/footer";
 
const DoctorDetails = () => {

  
  const navigate = useNavigate();
  const handleBookingClick = () => {
    navigate("/Booking");
  };
  useEffect(() => {
    Aos.init()
  }, [])   
   
  
return (
<div className="maiN border"> 
  <div className="containerClinics">
    <h3>From here you can choose the clinic that suits you and book an appointment! </h3>
    <h4> avilable Clinics : </h4>
    <p> dentist ahamad will be avilable at these clinics </p> 
    <div className="Cards">
       <div  data-aos="fade-right"  data-aos-duration="1500" className="card1">
         <span class="name">Clinic Name: </span>
         <div className="first">
         <FaTooth className="icon"/>
         <span class="serv" > Services Provided: </span>
         </div>
         <div className="seco">
         <FaMapMarkerAlt className="icon"/>
         <span class="loc">location: </span>
         </div>
         <div className="third"> 
         <FaCalendarAlt className="icon" />
         <span class="date"> Date:</span>
         </div>
       </div>
       <div data-aos="zoom-out" data-aos-duration="1500"   className="card2">
         <span class="name2" >Clinic Name: </span>
         <div className="first2">
         <FaTooth className="icon"/>
         <span class="serv2" > Services Provided: </span>
         </div>
         <div className="seco2">
         <FaMapMarkerAlt className="icon"/>
         <span class="loc2">location: </span>
         </div>
         <div className="third2"> 
         <FaCalendarAlt className="icon" />
         <span class="date2"> Date:</span>
         </div>
       </div>
       <div data-aos="fade-left"  data-aos-duration="1500"  className="card3">
         <span class="name3" >Clinic Name: </span>
         <div className="first3">
         <FaTooth className="icon"/>
         <span class="serv3" > Services Provided: </span>
         </div>
         <div className="seco3">
         <FaMapMarkerAlt className="icon"/>
         <span class="loc3">location: </span>
         </div>
         <div className="third3"> 
         <FaCalendarAlt className="icon" />
         <span class="date3"> Date:</span>
         </div>
       </div>
    </div>
    <div className="Button-container"> 
    <button onClick={handleBookingClick} className="cta"> Continue <FaArrowRight/> </button>
    </div>
  {/* <div className="BookingContainer"> 
     <h4> to book an appointment </h4>
     <div className="booking border">
  <div className="dayPickerContainer">
    <style> {css} </style>
    <DayPicker
      styles={{
        caption: { color: 'rgb(67, 147, 167) ' }
      }}
      mode="single"
      selected={selected}
      onSelect={setSelected}
      footer={footer}
      showOutsideDays
      modifiersClassNames={{
        selected: 'my-selected',
        today: "my-today"
      }}
     />
   </div>
   <div className="timeClinics"> 
   <div className="time-slots">
      <p>Select a Time </p>
      {timeSlots.map((slot, index) => (
      <button key={index} >
      {slot.startTime} - {slot.endTime}
        </button>
          ))}
    </div>
  <div class="select">
     <p className="selectName">Select a clinic</p>
   <div 
    class="selected"
    data-default="All"
    data-one="option-1"
    data-two="option-2"
    data-three="option-3"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="1em"
      viewBox="0 0 512 512"
      class="arrow"
    >
      <path
        d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"
      ></path>
    </svg>
  </div>
  <div class="options">
    <div title="all">
      <input id="all" name="option" type="radio" checked="" />
      <label class="option" for="all" data-txt="All"></label>
    </div>
    <div title="option-1">
      <input id="option-1" name="option" type="radio" />
      <label class="option" for="option-1" data-txt="Clinic-1"></label>
    </div>
    <div title="option-2">
      <input id="option-2" name="option" type="radio" />
      <label class="option" for="option-2" data-txt="Clinic-2"></label>
    </div>
    <div title="option-3">
      <input id="option-3" name="option" type="radio" />
      <label class="option" for="option-3" data-txt="Clinic-3"></label>
    </div>
    </div>
    </div> 
    </div>
   </div>
  </div>*/ }
 </div> 
 <Footer/> 
 </div>

    );
};
export default DoctorDetails; 
