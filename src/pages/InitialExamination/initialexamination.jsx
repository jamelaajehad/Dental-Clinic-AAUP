import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { format, addDays, eachDayOfInterval, isWeekend, startOfToday } from 'date-fns';
import './initialexamination.css';

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
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedTime, setSelectedTime] = useState('');

  const navigate = useNavigate();

  const handleBookingTypeSelection = (type) => {
    setBookingType(type);
    setStep(2);
  };

  const handleDaySelection = (day) => {
    setSelectedDay(day);
    setStep(4); // Move to the time selection step
  };

  const handleTimeSelection = (time) => {
    setSelectedTime(time);
    handleBookingConfirmation(bookingType, selectedDay, time);
  };

  const handleBookingConfirmation = (type, day, time) => {
   alert(`Booking confirmed!\nType: ${type}\nDay: ${format(day, 'EEEE, MMMM do yyyy')}\nTime: ${time}`);
    // Reset form or navigate to a confirmation page if needed
  };

  const handleMedicalHistorySubmit = () => {
    // Check if all medical history questions are answered
    if (Object.values(medicalHistory).every(value => value !== '')) {
      // Move to the next step
      setStep(3); // Move to the day selection step
    } else {
      alert("Please answer all medical history questions before proceeding.");
    }
  };

  const handleBackButton = () => {
    setStep(step - 1);
  };

  return (
    <div className="doctor-container">
      {step === 1 && (
        <div className="step-container">
          <h2>Select Booking Type</h2>
          {bookingTypes.map((type, index) => (
            <div key={index} className="radio-button" onClick={() => handleBookingTypeSelection(type)}>
              <input type="radio" id={type} name="bookingType" value={type} />
              <label htmlFor={type}>{type}</label>
            </div>
          ))}
        </div>
      )}

      {step === 2 && (
        
        <div className="step-container">
          <div className="medical-history">
          <p>Medical History:</p>
            <p>1. Have there been any changes in your health in the past year?</p>
            <div className="radio-options">
              <input type="radio" id="changesInHealthYes" name="changesInHealth" value="Yes" onChange={(e) => setMedicalHistory({ ...medicalHistory, changesInHealth: e.target.value })} />
              <label htmlFor="changesInHealthYes">Yes</label>
              <input type="radio" id="changesInHealthNo" name="changesInHealth" value="No" onChange={(e) => setMedicalHistory({ ...medicalHistory, changesInHealth: e.target.value })} />
              <label htmlFor="changesInHealthNo">No</label>
            </div>

            {/* Add more questions */}
            <p>2. Are you under the care of a physician?</p>
            <div className="radio-options">
              <input type="radio" id="underPhysicianCareYes" name="underPhysicianCare" value="Yes" onChange={(e) => setMedicalHistory({ ...medicalHistory, underPhysicianCare: e.target.value })} />
              <label htmlFor="underPhysicianCareYes">Yes</label>
              <input type="radio" id="underPhysicianCareNo" name="underPhysicianCare" value="No" onChange={(e) => setMedicalHistory({ ...medicalHistory, underPhysicianCare: e.target.value })} />
              <label htmlFor="underPhysicianCareNo">No</label>
            </div>

            <p>3. Have you had any serious illnesses or operations?</p>
            <div className="radio-options">
              <input type="radio" id="seriousIllnessesYes" name="seriousIllnesses" value="Yes" onChange={(e) => setMedicalHistory({ ...medicalHistory, seriousIllnesses: e.target.value })} />
              <label htmlFor="seriousIllnessesYes">Yes</label>
              <input type="radio" id="seriousIllnessesNo" name="seriousIllnesses" value="No" onChange={(e) => setMedicalHistory({ ...medicalHistory, seriousIllnesses: e.target.value })} />
              <label htmlFor="seriousIllnessesNo">No</label>
            </div>

            <p>4. Females: Are you pregnant?</p>
            <div className="radio-options">
              <input type="radio" id="pregnantYes" name="pregnant" value="Yes" onChange={(e) => setMedicalHistory({ ...medicalHistory, pregnant: e.target.value })} />
              <label htmlFor="pregnantYes">Yes</label>
              <input type="radio" id="pregnantNo" name="pregnant" value="No" onChange={(e) => setMedicalHistory({ ...medicalHistory, pregnant: e.target.value })} />
              <label htmlFor="pregnantNo">No</label>
            </div>
          </div>

          {/* Additional questions */}
          <p>Please check if you have (or have had) any of the following problems:</p>
          <div className="medical-history">
            <p>Heart Disease:</p>
            <div className="checkbox-options">
              <input type="checkbox" id="heartDiseaseHeartFailure" name="heartDisease" value="Heart Failure" onChange={(e) => setMedicalHistory({ ...medicalHistory, heartDisease: e.target.value })} />
              <label htmlFor="heartDiseaseHeartFailure">Heart Failure</label>
              <input type="checkbox" id="heartDiseaseHeartAttack" name="heartDisease" value="Heart Attack" onChange={(e=> setMedicalHistory({ ...medicalHistory, heartDisease: e.target.value }))} />

<label htmlFor="heartDiseaseHeartAttack">Heart Attack</label>
<input type="checkbox" id="heartDiseaseAngina" name="heartDisease" value="Angina" onChange={(e) => setMedicalHistory({ ...medicalHistory, heartDisease: e.target.value })} />
<label htmlFor="heartDiseaseAngina">Angina</label>
<input type="checkbox" id="heartDiseasePacemaker" name="heartDisease" value="Pacemaker" onChange={(e) => setMedicalHistory({ ...medicalHistory, heartDisease: e.target.value })} />
<label htmlFor="heartDiseasePacemaker">Pacemaker</label>
<input type="checkbox" id="heartDiseaseCongenital" name="heartDisease" value="Congenital Heart Disease" onChange={(e) => setMedicalHistory({ ...medicalHistory, heartDisease: e.target.value })} />
<label htmlFor="heartDiseaseCongenital">Congenital Heart Disease</label>
<input type="text" id="heartDiseaseOther" name="heartDisease" placeholder="Other" onChange={(e) => setMedicalHistory({ ...medicalHistory, heartDisease: e.target.value })} />
</div>

{/* Blood Disease */}
<p>Blood Disease:</p>
<div className="checkbox-options">
<input type="checkbox" id="bloodDiseaseAnemia" name="bloodDisease" value="Anemia" onChange={(e) => setMedicalHistory({ ...medicalHistory, bloodDisease: e.target.value })} />
<label htmlFor="bloodDiseaseAnemia">Anemia</label>
<input type="checkbox" id="bloodDiseaseHemophilia" name="bloodDisease" value="Hemophilia" onChange={(e) => setMedicalHistory({ ...medicalHistory, bloodDisease: e.target.value })} />
<label htmlFor="bloodDiseaseHemophilia">Hemophilia</label>
<input type="checkbox" id="bloodDiseaseLeukemia" name="bloodDisease" value="Leukemia" onChange={(e) => setMedicalHistory({ ...medicalHistory, bloodDisease: e.target.value })} />
<label htmlFor="bloodDiseaseLeukemia">Leukemia</label>
<input type="checkbox" id="bloodDiseaseTransfusion" name="bloodDisease" value="Blood Transfusion" onChange={(e) => setMedicalHistory({ ...medicalHistory, bloodDisease: e.target.value })} />
<label htmlFor="bloodDiseaseTransfusion">Blood Transfusion</label>
<input type="text" id="bloodDiseaseOther" name="bloodDisease" placeholder="Other" onChange={(e) => setMedicalHistory({ ...medicalHistory, bloodDisease: e.target.value })} />
</div>
</div>

{/* Dental History */}
<p>Dental History:</p>
<div className="medical-history">
<p>Have you had any serious problems with any previous dental treatment?</p>
<div className="radio-options">
<input type="radio" id="previousDentalTreatmentYes" name="previousDentalTreatment" value="Yes" onChange={(e) => setMedicalHistory({ ...medicalHistory, previousDentalTreatment: e.target.value })} />
<label htmlFor="previousDentalTreatmentYes">Yes</label>
<input type="radio" id="previousDentalTreatmentNo" name="previousDentalTreatment" value="No" onChange={(e) => setMedicalHistory({ ...medicalHistory, previousDentalTreatment: e.target.value })} />
<label htmlFor="previousDentalTreatmentNo">No</label>
</div>

<p>Have you ever had an injury to your face, jaw, or teeth?</p>
<div className="radio-options">
<input type="radio" id="injuryToFaceYes" name="injuryToFace" value="Yes" onChange={(e) => setMedicalHistory({ ...medicalHistory, injuryToFace: e.target.value })} />
<label htmlFor="injuryToFaceYes">Yes</label>
<input type="radio" id="injuryToFaceNo" name="injuryToFace" value="No" onChange={(e) => setMedicalHistory({ ...medicalHistory, injuryToFace: e.target.value })} />
<label htmlFor="injuryToFaceNo">No</label>
</div>

<p>Do you ever feel like you have a dry mouth?</p>
<div className="radio-options">
<input type="radio" id="dryMouthYes" name="dryMouth" value="Yes" onChange={(e) => setMedicalHistory({ ...medicalHistory, dryMouth: e.target.value })} />
<label htmlFor="dryMouthYes">Yes</label>
<input type="radio" id="dryMouthNo" name="dryMouth" value="No" onChange={(e) => setMedicalHistory({ ...medicalHistory, dryMouth: e.target.value })} />
<label htmlFor="dryMouthNo">No</label>
</div>

<p>Have you ever had an unusual reaction to local anesthetic?</p>
<div className="radio-options">
<input type="radio" id="unusualReactionYes" name="unusualReaction" value="Yes" onChange={(e) => setMedicalHistory({ ...medicalHistory, unusualReaction: e.target.value })} />
<label htmlFor="unusualReactionYes">Yes</label>
<input type="radio" id="unusualReactionNo" name="unusualReaction" value="No" onChange={(e) => setMedicalHistory({ ...medicalHistory, unusualReaction: e.target.value })} />
<label htmlFor="unusualReactionNo">No</label>
</div>

<p>Do you clench your teeth?</p>
<div className="radio-options">
<input type="radio" id="clenchTeethYes" name="clenchTeeth" value="Yes" onChange={(e) => setMedicalHistory({ ...medicalHistory, clenchTeeth: e.target.value })} />
<label htmlFor="clenchTeethYes">Yes</label>

<input type="radio" id="clenchTeethNo" name="clenchTeeth" value="No" onChange={(e) => setMedicalHistory({ ...medicalHistory, clenchTeeth: e.target.value })} />
<label htmlFor="clenchTeethNo">No</label>
</div>
</div>
<button className="custom-next-button" onClick={handleMedicalHistorySubmit}>Next</button>
<button className="custom-back-button" onClick={handleBackButton}>Back</button>
</div>
)}

{step === 3 && (
<div className="step-container">
<h2>Select Day</h2>
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

      {step === 4 && (
        <div className="step-container">
          <h2>Select Initial Check-up Time</h2>
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
    </div>
  );
};

export default Initial ;