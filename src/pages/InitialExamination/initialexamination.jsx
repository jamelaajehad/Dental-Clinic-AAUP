import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { format, addDays, eachDayOfInterval, isWeekend, startOfToday } from 'date-fns';
import './initialexamination.css';
import Footer from "../../components/Footer/footer"; 
import MedicalHistoryForm from '../../components/MedicalHistoryForm/MedicalHistoryForm';
import DentalHistoryForm from '../../components/DentalHistoryForm/DentalHistoryForm';
import userbooking from "../../Asset/app-images/userbooking.png";


const bookingTypes = ['Adult', 'Paediatric'];
const availableTimes = [
  '08:30 AM', '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM',
  '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM', '01:00 PM',
  '01:30 PM', '02:00 PM', '02:30 PM', '03:00 PM'
];

const getNextWeekdays = (daysToShow) => {
  const today = startOfToday();
  const days = eachDayOfInterval({ start: today, end: addDays(today, 14) })
    .filter(day => !isWeekend(day))
    .slice(0, daysToShow);
  return days;
};

const availableDays = getNextWeekdays(7); // Get next 7 weekdays

const Initial = () => {
  const [step, setStep] = useState(1);
  const [bookingType, setBookingType] = useState('');
  const [medicalHistory, setMedicalHistory] = useState({
    changesInHealth: '',
    underPhysicianCare: '',
    seriousIllnesses: '',
    pregnant: '',
    heartDisease: '',
    bloodDisease: ''
  });

  const [dentalHistory, setDentalHistory] = useState({
    previousDentalTreatment: '',
    injuryToFace: '',
    dryMouth: '',
    unusualReaction: '',
    clenchTeeth: '',
  });

  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedTime, setSelectedTime] = useState('');

  const navigate = useNavigate();

  const handleBookingTypeSelection = (type) => {
    setBookingType(type);
    setStep(2);
  };

  const handleDaySelection = (day) => {
    setSelectedDay(day);
    setStep(5); // Move to the time selection step
  };

  const handleTimeSelection = (time) => {
    setSelectedTime(time);
    handleBookingConfirmation(bookingType, selectedDay, time);
  };

  const handleBookingConfirmation = (type, day, time) => {
   alert(`Booking confirmed!\nType: ${type}\nDay: ${format(day, 'EEEE, MMMM do yyyy')}\nTime: ${time}`);
    
  };

  const handleMedicalHistorySubmit = () => {
    
    if (Object.values(medicalHistory).every(value => value !== '')) {
      // Move to the next step
      setStep(3); // Move to the day selection step
    } else {
      alert("Please answer all medical history questions before proceeding.");
    }
  };
  const handleDentalHistorySubmit = () => {
    if (Object.values(dentalHistory).every(value => value !== '')) {
      
      setStep(4); 
    } else {
      alert("Please answer all dental history questions before proceeding.");
    }
  };


  const handleBackButton = () => {
    setStep(step - 1);
  };

  return (
    <div className="bigContainer">
      <div className='initial-Pic'> 

      </div>
      {step === 1 && (
        <div>
        <div className='initial-title'>
        <p align="left"> From here you can book an appointment for the initial examination at Arab American University clinics:</p>
        </div>
        <div className="select-Container">
          <h4 className='booking-type'><img
           src={userbooking}
           alt="userbooking"
           style={{ width: "30px", height: "30px" }}
           className="userbooking-picture"
         />
            Select Booking Type</h4>
          {bookingTypes.map((type, index) => (
            <div key={index} className="radio-button" onClick={() => handleBookingTypeSelection(type)}>
              <input type="radio" id={type} name="bookingType" value={type} />
              <label htmlFor={type}>{type}</label>
            </div>
          ))}
          </div> 
        </div>
      )}

      {step === 2 && (
        
        <MedicalHistoryForm
          medicalHistory={medicalHistory}
          setMedicalHistory={setMedicalHistory}
          handleMedicalHistorySubmit={handleMedicalHistorySubmit}
          handleBackButton={handleBackButton}
        />
      )}
        {step === 3 && (
        <DentalHistoryForm
          dentalHistory={dentalHistory}
          setDentalHistory={setDentalHistory}
          handleDentalHistorySubmit={handleDentalHistorySubmit}
          handleBackButton={handleBackButton}
        />
      )}

        {step === 4 && (
        <div className="step-container">
          <h3>Select Day</h3>
         <div className="day-options">
            {availableDays.map((day, index) => (
              <button key={index} className="day-button" onClick={() => handleDaySelection(day)}>
                {format(day, 'EEEE, MMMM do yyyy')}
              </button>
            ))}
          </div>
          <button className="custom-back-button" onClick={handleBackButton}>Back</button>
        </div>
      )}

      {step === 5 && (
        <div className="step-container">
          <h3>Select initial examination time</h3>
          <div className="time-options">
            {availableTimes.map((time, index) => (
              <button key={index} className="time-button" onClick={() => handleTimeSelection(time)}>
                {time}
              </button>
            ))}
          </div>
          <button className="custom-back-button" onClick={handleBackButton}>Back</button>
         
        </div>
        
      )}
       <Footer />
    </div>
    
  );
};

export default Initial ;