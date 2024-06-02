/*import React  from "react";
import './booking.css' ; 
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { format } from 'date-fns';
import { useState } from 'react';
import Aos from "aos";
import 'aos/dist/aos.css';
import { useEffect } from 'react';
import { FaCalendarAlt, FaClock, FaClinicMedical ,  FaCalendarPlus } from 'react-icons/fa';

const css = `
.my-today {
  color : rgb(67, 147, 167);
  font-weight : bold;
  font-size: 120%; 
}
.my-selected:not([disabled]) { 
  font-weight: bold; 
  border: 1px solid rgb(67, 147, 167);
}
.my-selected:hover:not([disabled]) { 
  border-color: rgb(67, 147, 167);
  color: black;
}

`
const Booking = () => {
    const [selected, setSelected] = useState();
    const [selectedTime, setSelectedTime] = useState(null);
    const [selectedClinic, setSelectedClinic] = useState("");

    let footer = null;
    if (selected) {
      footer = <p>You picked {format(selected, "PP")}.</p>;
    }
  
    const timeSlots = [
      { startTime: "9:00 AM", endTime: "10:00 AM" },
      { startTime: "10:00 AM", endTime: "11:00 AM" },
      { startTime: "11:00 AM", endTime: "12:00 PM" },
      { startTime: "12:00 PM", endTime: "1:00 PM" },
      { startTime: "1:00 PM", endTime: "2:00 PM" },
      { startTime: "2:00 PM", endTime: "3:00 PM" },
    ];

    const clinics = ["Clinic-1", "Clinic-2", "Clinic-3"];

    useEffect(() => {
      Aos.init()
    }, [])    
    const handleTimeSelection = (time) => {
      setSelectedTime(time);
    };
  
    const handleClinicSelection = (event) => {
      setSelectedClinic(event.target.value);
    };
    const handleSubmit = () => {
      alert(`Appointment booked:\nDate: ${format(selected, "PP")}\nTime: ${selectedTime}\nClinic: ${selectedClinic}`);
    };

 return(
    <div className="mainCon border"> 
    <div data-aos="zoom-out" data-aos-duration="1300" className="BookingContainer"> 
    <h4> When you would like to come in ? </h4>
     <p class="two"> Select the day ,time and clinic that you want to schedule your appointment.</p>
    <div className="booking1 border ">
     <h5 >  <FaCalendarAlt className="icon" /> Please pick a day </h5> 
     <div className="booking2 ">
     <div className="dayPickerContainer">
      <style> {css} </style>
       <DayPicker
        styles={{
       caption: { color: 'rgb(67, 147, 167) ' }
       }}
        mode="single"
        selected={selected}
        onSelect={setSelected}
        showOutsideDays
        modifiersClassNames={{
        selected: 'my-selected',
        today: "my-today"
       }}
    />
    </div>
  <div className="timeClinics"> 
  <div className="time-slots">
     <p><FaClock className="icon" /> Select a Time </p>
     {timeSlots.map((slot, index) => (
     <button key={index} >
     {slot.startTime} - {slot.endTime}
       </button>
         ))}
   </div>
  <div class="select">
    <p className="selectName"><FaClinicMedical className="icon" />Select a clinic</p>
    <div className="selected" data-default="All">
     <select onChange={handleClinicSelection}>
        <option value="">Select a clinic</option>
          {clinics.map((clinic, index) => (
           <option key={index} value={clinic}>{clinic}</option>
          ))}
         </select>  
    </div>
   </div>
   </div> 
   </div>
  </div>
    <div className="summary">
      <h5>Appointment Summary</h5>
        <p><strong>Date:</strong> {selected ? format(selected, "PP") : "Not selected"}</p>
        <p><strong>Time:</strong> {selectedTime || "Not selected"}</p>
        <p><strong>Clinic:</strong> {selectedClinic || "Not selected"}</p>
        <button onClick={handleSubmit} disabled={!selected || !selectedTime || !selectedClinic}>
          Submit Appointment
        </button>
     </div>
  </div>
  </div>
  
 );

}
export default Booking; */

import React  from "react";
import './booking.css' ; 
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { format } from 'date-fns';
import { useState } from 'react';
import Aos from "aos";
import 'aos/dist/aos.css';
import { useEffect } from 'react';
import { FaCalendarAlt, FaClock, FaClinicMedical, FaCalendarPlus } from 'react-icons/fa';
import Footer from "../../components/Footer/footer";

const css = `
.my-today {
  color : rgb(67, 147, 167);
  font-weight : bold;
  font-size: 120%; 
}
.my-selected:not([disabled]) { 
  font-weight: bold; 
  border: 1px solid rgb(67, 147, 167);
}
.my-selected:hover:not([disabled]) { 
  border-color: rgb(67, 147, 167);
  color: black;
}

`
const Booking = () => {
    const [selected, setSelected] = useState();
    let footer = null;
    if (selected) {
      footer = <p>You picked {format(selected, "PP")}.</p>;
    }
  
    const timeSlots = [
      { startTime: "9:00 AM"},
      { startTime: "10:00 AM"},
      { startTime: "11:00 AM" },
      { startTime: "12:00 PM" },
      { startTime: "1:00 PM" },
      { startTime: "2:00 PM" },
    ];
    useEffect(() => {
        Aos.init()
      }, [])   
 return(
    <div className="mainCon border"> 
    <div data-aos="zoom-out" data-aos-duration="1300" className="BookingContainer"> 
    <h4> When you would like to come in ? </h4>
     <p class="two"> Select the day ,time and clinic that you want to schedule your appointment.</p>
    <div className="map"> 
    <div className="booking1  ">
    <h5 > Book an appointment : </h5>
     <div className="dental"> 
     <div className="booking2 ">
     <div className="dayPickerSection1">
      <p className="day"><FaCalendarAlt className="icon" /> Please pick a day</p>                         
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
    </div>
  <div className="timeClinics"> 
  <div className="time-slots">
     <p><FaClock className="icon" /> Select a Time </p>
     {timeSlots.map((slot, index) => (
     <button key={index} >
     {slot.startTime} 
       </button>
         ))}
   </div>
 <div class="select">
    <p className="selectName"><FaClinicMedical className="icon" />Select a clinic</p>
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
  </div>
  </div>
  <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3368.483873168613!2d35.345195925263255!3d32.40619450284602!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151cfbd46b065def%3A0xd72f506cb984d61a!2z2KfZhNis2KfZhdi52Kkg2KfZhNi52LHYqNmK2Kkg2KfZhNij2YXYsdmK2YPZitip!5e0!3m2!1sar!2s!4v1716404416194!5m2!1sar!2s" width="400" height="450" style={{ border: "0" }} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade">
</iframe>
  </div>
  </div>
  <Footer/> 
 </div>  
 );
}
export default Booking;