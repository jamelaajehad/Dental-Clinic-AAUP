import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  format,
  addDays,
  eachDayOfInterval,
  isWeekend,
  startOfToday,
} from "date-fns";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../../firebase"; // Adjust the import path as necessary
import "./initialexamination.css";
import Footer from "../../components/Footer/footer";
import MedicalHistoryForm from "../../components/MedicalHistoryForm/MedicalHistoryForm";
import DentalHistoryForm from "../../components/DentalHistoryForm/DentalHistoryForm";
import userbooking from "../../Asset/app-images/userbooking.png";

const bookingTypes = ["Adult", "Paediatric"];
const getNextWeekdays = (daysToShow) => {
  const today = startOfToday();
  const days = eachDayOfInterval({ start: today, end: addDays(today, 14) })
    .filter((day) => {
      const dayOfWeek = new Date(day).getDay();
      console.log("Day of week:", dayOfWeek);
      return dayOfWeek !== 4 && dayOfWeek !== 5;
    })
    .slice(0, daysToShow);
  console.log("Filtered Days:", days);
  return days;
};

const availableDays = getNextWeekdays(7); // Get next 7 weekdays

const Initial = () => {
  const [step, setStep] = useState(1);
  const [bookingType, setBookingType] = useState("");
  const [medicalHistory, setMedicalHistory] = useState({
    changesInHealth: "",
    underPhysicianCare: "",
    seriousIllnesses: "",
    pregnant: "",
    heartDisease: "",
    bloodDisease: "",
  });

  const [dentalHistory, setDentalHistory] = useState({
    previousDentalTreatment: "",
    injuryToFace: "",
    dryMouth: "",
    unusualReaction: "",
    clenchTeeth: "",
  });

  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [availableTimes, setAvailableTimes] = useState([]);

  const navigate = useNavigate();

  const formatTime = (hour, minute) => {
    const meridiem = hour >= 12 ? "PM" : "AM";
    const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
    const formattedMinute = minute.toString().padStart(2, "0");
    return `${formattedHour}:${formattedMinute} ${meridiem}`;
  };
  const generateTimeSlots = (startTime, endTime) => {
    console.log("Generating time slots...");
    console.log("Start Time:", startTime, "End Time:", endTime);

    const timeSlots = [];
    const [startHour, startMinute] = startTime.split(":").map(Number);
    let [endHour, endMinute] = endTime.split(":").map(Number);

    // Adjust end time if it's before start time
    if (
      endHour < startHour ||
      (endHour === startHour && endMinute < startMinute)
    ) {
      endHour += 24; // Add 24 hours to end time
    }

    let currentHour = startHour;
    let currentMinute = startMinute;

    while (
      currentHour < endHour ||
      (currentHour === endHour && currentMinute < endMinute)
    ) {
      const formattedStartTime = formatTime(currentHour, currentMinute);

      currentMinute += 60;
      if (currentMinute >= 60) {
        currentHour += 1;
        currentMinute -= 60;
      }

      const formattedEndTime = formatTime(currentHour, currentMinute);

      timeSlots.push({
        startTime: formattedStartTime,
        endTime: formattedEndTime,
      });
    }

    console.log("Generated Time Slots:", timeSlots);
    return timeSlots;
  };

  useEffect(() => {
    const fetchAvailableTimes = async () => {
      try {
        // Fetch available times from Firebase database
        const querySnapshot = await getDocs(
          collection(firestore, "InitialExamination")
        );
        const times = [];

        querySnapshot.forEach((doc) => {
          const startTime = doc.data().startTime;
          const endTime = doc.data().endTime;
          console.log("Start Time:", startTime, "End Time:", endTime);
          const timeSlots = generateTimeSlots(startTime, endTime);
          console.log("Time Slots:", timeSlots);
          times.push(...timeSlots);
        });

        console.log("Available Times:", times);
        setAvailableTimes(times);
      } catch (error) {
        console.error("Error fetching available times:", error);
        // Handle error (e.g., show error message to user)
      }
    };

    fetchAvailableTimes();
  }, []);

  const handleBookingTypeSelection = (type) => {
    setBookingType(type);
    setStep(2);
  };

  const handleDaySelection = (day) => {
    setSelectedDay(day);
    setStep(5); // Move to the time selection step
  };

  const handleTimeSelection = (startTime, endTime) => {
    setSelectedTime(`${startTime} - ${endTime}`);
    handleBookingConfirmation(
      bookingType,
      selectedDay,
      `${startTime} - ${endTime}`
    );
  };

  const handleBookingConfirmation = (type, day, time) => {
    alert(
      `Booking confirmed!\nType: ${type}\nDay: ${format(
        day,
        "EEEE, MMMM do yyyy"
      )}\nTime: ${time}`
    );
  };

  const handleMedicalHistorySubmit = () => {
    if (Object.values(medicalHistory)) {
      // Move to the next step
      setStep(3); // Move to the day selection step
    } else {
      alert("Please answer all medical history questions before proceeding.");
    }
  };

  const handleDentalHistorySubmit = () => {
    if (Object.values(dentalHistory)) {
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
      <div className="initial-Pic"> </div>
      {step === 1 && (
        <div>
          <div className="initial-title">
            <p align="left">
              {" "}
              From here you can book an appointment for the initial examination
              at Arab American University clinics:
            </p>
          </div>
          <div className="select-Container">
            <h4 className="booking-type">
              <img
                src={userbooking}
                alt="userbooking"
                style={{ width: "30px", height: "30px" }}
                className="userbooking-picture"
              />{" "}
              Select Booking Type
            </h4>
            {bookingTypes.map((type, index) => (
              <div
                key={index}
                className="radio-button"
                onClick={() => handleBookingTypeSelection(type)}
              >
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
              <button
                key={index}
                className="day-button"
                onClick={() => handleDaySelection(day)}
              >
                {format(day, "EEEE, MMMM do yyyy")}
              </button>
            ))}
          </div>
          <button className="custom-back-button" onClick={handleBackButton}>
            Back
          </button>
        </div>
      )}

      {step === 5 && (
        <div className="step-container">
          <h3>Select initial examination time</h3>
          <div className="time-options">
            {availableTimes.map((time, index) => (
              <button
                key={index}
                className="time-button"
                onClick={() =>
                  handleTimeSelection(time.startTime, time.endTime)
                }
              >
                {`${time.startTime} - ${time.endTime}`}
              </button>
            ))}
          </div>
          <button className="custom-back-button" onClick={handleBackButton}>
            Back
          </button>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Initial;
