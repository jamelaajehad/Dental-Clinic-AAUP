import React from 'react';
import { FaComment } from 'react-icons/fa';
import './StaticDoctorProfile.css';

const StaticDoctorProfile = () => {
  const selectedDoctor = {
    image: 'https://firebasestorage.googleapis.com/v0/b/dental-aaup.appspot.com/o/2.jpg?alt=media&token=d60f4b7f-a9c5-4165-97c6-2c288e692ade', // صورة وهمية
    fullname: 'Dr. John Doe',
    Description: 'Experienced dentist specializing in preventive and cosmetic dentistry.',
    Education: 'Harvard University, Dental Medicine',
    Experience: '10 years of experience in dental care and surgery',
  };

  const matchingClinic = {
    ClinicName: 'Bright Smile Clinic',
  };

  const selectedTime = {
    startTime: '10:00 AM',
    endTime: '11:00 AM',
  };

  const handleBookingConfirmation = () => {
    // Logic for booking confirmation
    console.log('Booking confirmed');
  };

  const startChat = (doctorId, doctorName) => {
    // Logic to start chat
    console.log(`Starting chat with ${doctorName}`);
  };

  const handleBackClick = () => {
    // Logic for back button
    console.log('Back button clicked');
  };

  return (
    <div>
      <div className="confirmation-container">
        <div className="selected-doctor-info">
          <img
            src={selectedDoctor.image}
            alt={selectedDoctor.fullname}
            className="selected-doctor-image"
          />
        </div>
        <div className="selected-doctor">
          <h4>About {selectedDoctor.fullname} </h4>
          <p>{selectedDoctor.Description}</p>
          <p>
            <strong>Education:</strong> {selectedDoctor.Education}
          </p>
          <p>
            <strong>Experience: </strong> {selectedDoctor.Experience}
          </p>
        </div>
        <div className="booking-card">
          <p>
            <strong>Doctor name:</strong> {selectedDoctor.fullname}
          </p>
          <p>
            <strong>Clinic:</strong> {matchingClinic.ClinicName}
          </p>
          <p>
            <strong>Time:</strong> {selectedTime.startTime} - {selectedTime.endTime}
          </p>
          <button
            className="confirm-button2"
            onClick={handleBookingConfirmation}
          >
            Confirm Booking
          </button>
          <FaComment
            className="message-icon"
            onClick={() =>
              startChat(selectedDoctor.id, selectedDoctor.fullname)
            }
          />
        </div>
      </div>
      <button className="backk-button" onClick={handleBackClick}>
        Back
      </button>
    </div>
  );
};

export default StaticDoctorProfile;
