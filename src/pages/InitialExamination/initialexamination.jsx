 
import React, { useState, useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import { useNavigate } from "react-router-dom";
import {
  format,
  addDays,
  eachDayOfInterval,
  isWeekend,
  startOfToday,
} from "date-fns";
import {
  collection,
  getDocs,
  doc,
  setDoc,
  addDoc,
  getDoc,
} from "firebase/firestore";
import { firestore, auth } from "../../firebase"; // Ensure you have imported auth from firebase
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
      return dayOfWeek !== 4 && dayOfWeek !== 5;
    })
    .slice(0, daysToShow);
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
  const timeSlots = [];
  const [startHour, startMinute] = startTime.split(":").map(Number);
  let [endHour, endMinute] = endTime.split(":").map(Number);

  if (endHour < startHour || (endHour === startHour && endMinute < startMinute)) {
    endHour += 24; // Add 24 hours to end time
  }

  let currentHour = startHour;
  let currentMinute = startMinute;

  while (currentHour < endHour || (currentHour === endHour && currentMinute < endMinute)) {
    const formattedStartTime = formatTime(currentHour, currentMinute);

    currentMinute += 30; // Increment by 30 minutes for each time slot
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

  return timeSlots;
};


/*useEffect(() => {
  const fetchAvailableTimes = async () => {
    try {
      const startTime = "08:30";
      const endTime = "15:00";
      const daysToShow = 7; // Show next 7 days including today
      const today = startOfToday();
      const endOfWeek = addDays(today, daysToShow - 1);

      const days = eachDayOfInterval({ start: today, end: endOfWeek }).filter(
        (day) => !isWeekend(day) // Filter out weekends
      );

      const timeSlots = generateTimeSlots(startTime, endTime);

      // Fetch booked appointments from Firestore for the entire week
      const querySnapshot = await getDocs(collection(firestore, "Appointments"));
      const bookedTimes = {};
      
      querySnapshot.forEach((doc) => {
        const { day, time } = doc.data();
        if (!bookedTimes[day]) {
          bookedTimes[day] = [];
        }
        bookedTimes[day].push(time);
      });

      // Mark time slots as available or reserved based on fetched data
      const updatedTimeSlots = timeSlots.map((slot) => {
        const day = format(selectedDay, "EEEE, MMMM do yyyy");
        const isAvailable = !bookedTimes[day]?.includes(`${slot.startTime} - ${slot.endTime}`);
        return {
          ...slot,
          available: isAvailable,
        };
      });

      setAvailableTimes(updatedTimeSlots);
    } catch (error) {
      console.error("Error fetching available times:", error);
    }
  };

  if (selectedDay) {
    fetchAvailableTimes();
  }
}, [selectedDay]); // Run whenever selectedDay changes
*/
useEffect(() => {
  const fetchAvailableTimes = async () => {
    try {
      const startTime = "08:30";
      const endTime = "15:00";
      const timeSlots = generateTimeSlots(startTime, endTime);

      // Fetch booked appointments from Firestore
      const querySnapshot = await getDocs(collection(firestore, "Appointments"));
      const bookedTimes = {};

      querySnapshot.forEach((doc) => {
        const { day, time } = doc.data();
        if (!bookedTimes[day]) {
          bookedTimes[day] = [];
        }
        bookedTimes[day].push(time);
      });

      // Mark time slots as available or reserved based on fetched data
      const updatedTimeSlots = timeSlots.map((slot) => {
        const day = format(selectedDay, "EEEE, MMMM do yyyy");
        const isAvailable = !bookedTimes[day]?.includes(`${slot.startTime} - ${slot.endTime}`);
        return {
          ...slot,
          available: isAvailable,
        };
      });

      setAvailableTimes(updatedTimeSlots);
    } catch (error) {
      console.error("Error fetching available times:", error);
    }
  };

  if (selectedDay) {
    fetchAvailableTimes();
  }
}, [selectedDay]); // Run whenever selectedDay changes

  const handleBookingTypeSelection = (type) => {
    setBookingType(type);
    setStep(2);
  };

  const handleDaySelection = (day) => {
    setSelectedDay(day);
    setStep(4); 
  };

  const handleTimeSelection = async (startTime, endTime) => {
    // Check if the selected time slot is available
    const selectedSlot = `${startTime} - ${endTime}`;
    const isAvailable = availableTimes.find(slot => slot.startTime === startTime && slot.endTime === endTime)?.available;
  
    if (!isAvailable) {
      alert("This time slot is already booked. Please choose another time.");
    } else {
      setSelectedTime(selectedSlot);
      await handleBookingConfirmation(bookingType, selectedDay, selectedSlot);
    }
  };

  

  const handleBookingConfirmation = async (type, day, time) => {
    const userId = auth.currentUser.uid;

    // Reference to the patient document
    const userDocRef = doc(firestore, "Patients", userId);

    // Update the user document with medical history, dental history, and patient type
    await setDoc(
      userDocRef,
      {
        patientType: type, // Storing the patient type
        medicalHistory: {
          changesInHealth: medicalHistory.changesInHealth,
          underPhysicianCare: medicalHistory.underPhysicianCare,
          seriousIllnesses: medicalHistory.seriousIllnesses,
          pregnant: medicalHistory.pregnant,
          heartDisease: medicalHistory.heartDisease,
          bloodDisease: medicalHistory.bloodDisease,
        },
        dentalHistory: {
          previousDentalTreatment: dentalHistory.previousDentalTreatment,
          injuryToFace: dentalHistory.injuryToFace,
          dryMouth: dentalHistory.dryMouth,
          unusualReaction: dentalHistory.unusualReaction,
          clenchTeeth: dentalHistory.clenchTeeth,
        },
      },
      { merge: true }
    );

    // Store appointment information in "appointments" collection
    const appointmentRef = collection(firestore, "Appointments");
    await addDoc(appointmentRef, {
      userId: userId,
      
      day: format(day, "EEEE, MMMM do yyyy"),
      time: time,
    });

    alert(
      `Booking confirmed!\nType: ${type}\nDay: ${format(
        day,
        "EEEE, MMMM do yyyy"
      )}\nTime: ${time}`
    );
  };

  const handleMedicalHistorySubmit = () => {
    if (Object.values(medicalHistory).every((field) => field)) {
      setStep(3); // Move to the next step
    } else {
      alert("Please answer all medical history questions before proceeding.");
    }
  };

  const handleDentalHistorySubmit = () => {
    if (Object.values(dentalHistory).every((field) => field)) {
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
      <div className="initial-Pic"> 
      <h1 data-aos="fade-right" data-aos-duration="1500" align="left">
            Welcome to the initial examination clinic
          </h1>
      </div>
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
  <div className="dayContainer">
    <p>Choose the day and time that suits you for the initial examination</p>
    <div className="day-options-container">
      <h4> Select day </h4>
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
    
    {selectedDay && (
      <div className="time-options-container">
        <h4>Select Time for {format(selectedDay, "EEEE, MMMM do yyyy")}</h4>
        <div className="time-options">
          {availableTimes.map((time, index) => (
            <button
              key={index}
              className={`time-button ${!time.available ? 'booked' : ''}`}
              onClick={() => handleTimeSelection(time.startTime, time.endTime)}
              disabled={!time.available}
            >
              {time.startTime} - {time.endTime}
            </button>
          ))}
        </div>
        <button className="custom-back-button" onClick={handleBackButton}>
           Back
          </button>
      </div>
      
    )}
    </div>
  </div>
)}

  <Footer />
  </div>
  );
};

export default Initial;


