
// import React, { useEffect, useState } from "react";
// import { collection, query, where, getDocs, doc, getDoc, addDoc } from "firebase/firestore";
// import { firestore, auth } from "../../firebase";
// import Footer from "../../components/Footer/footer";
// import { useUser } from "../../contexts/UserContext";
// import { format, eachDayOfInterval, addDays, startOfToday } from "date-fns";
// import "./mybooking.css"; // Import your CSS file

// const MyBooking = () => {
//   const [matchingClinic, setMatchingClinic] = useState(null);
//   const { user } = useUser();
//   const [requiredTreatmentCondition, setRequiredTreatmentCondition] = useState("");
//   const [selectedDay, setSelectedDay] = useState(null);
//   const [availableTimes, setAvailableTimes] = useState([]);
//   const [availableDoctors, setAvailableDoctors] = useState([]);
//   const [selectedTime, setSelectedTime] = useState(null);
//   const [selectedDoctor, setSelectedDoctor] = useState(null);
//   const [step, setStep] = useState(1); // Step 1: Show clinic, Step 2: Show available days, Step 3: Show available times

//   useEffect(() => {
//     const fetchPatientData = async () => {
//       try {
//         if (!user || !user.uid) {
//           console.error("User is not set correctly or does not have a uid");
//           return;
//         }

//         const patientDocRef = doc(firestore, "Patients", user.uid);
//         const patientDoc = await getDoc(patientDocRef);

//         if (!patientDoc.exists()) {
//           console.error("No patient found with the given uid");
//           return;
//         }

//         const patientData = patientDoc.data();
//         setRequiredTreatmentCondition(patientData.requiredTreatmentCondition);

//         const clinicsCollectionRef = collection(firestore, "Clinics");
//         const clinicsQuery = query(
//           clinicsCollectionRef,
//           where("RequiredTreatment", "array-contains", patientData.requiredTreatmentCondition)
//         );
//         const clinicDocs = await getDocs(clinicsQuery);

//         if (clinicDocs.empty) {
//           setMatchingClinic(null);
//           return;
//         }

//         const clinicData = clinicDocs.docs[0].data();
//         setMatchingClinic(clinicData);

//         // Fetch available doctors
//         const doctorIds = clinicData.doctors;
//         if (doctorIds && doctorIds.length > 0) {
//           const doctorsQuery = query(collection(firestore, "Doctors"), where("__name__", "in", doctorIds));
//           const doctorsSnapshot = await getDocs(doctorsQuery);
//           const doctors = doctorsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//           setAvailableDoctors(doctors);
//         }
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     if (user && user.uid) {
//       fetchPatientData();
//     }
//   }, [user]);

//   const getNextWeekdays = (daysToShow) => {
//     const today = startOfToday();
//     const days = eachDayOfInterval({ start: today, end: addDays(today, 14) })
//       .filter((day) => {
//         const dayOfWeek = new Date(day).getDay();
//         return dayOfWeek !== 5 && dayOfWeek !== 6; // Skip Friday and Saturday
//       })
//       .slice(0, daysToShow);
//     return days;
//   };

//   const availableDays = getNextWeekdays(7); // Get next 7 weekdays

//   const formatTime = (hour, minute) => {
//     const meridiem = hour >= 12 ? "PM" : "AM";
//     const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
//     const formattedMinute = minute.toString().padStart(2, "0");
//     return `${formattedHour}:${formattedMinute} ${meridiem}`;
//   };

//   const generateTimeSlots = (startTime, endTime) => {
//     const timeSlots = [];
//     const [startHour, startMinute] = startTime.split(":").map(Number);
//     let [endHour, endMinute] = endTime.split(":").map(Number);

//     if (endHour < startHour || (endHour === startHour && endMinute < startMinute)) {
//       endHour += 24; // Add 24 hours to end time
//     }

//     let currentHour = startHour;
//     let currentMinute = startMinute;
//     let doctorIndex = 0;

//     while (currentHour < endHour || (currentHour === endHour && currentMinute < endMinute)) {
//       const formattedStartTime = formatTime(currentHour, currentMinute);

//       currentMinute += 90; // Increment by 90 minutes (1 hour and 30 minutes)
//       if (currentMinute >= 60) {
//         currentHour += Math.floor(currentMinute / 60);
//         currentMinute = currentMinute % 60;
//       }

//       const formattedEndTime = formatTime(currentHour, currentMinute);

//       timeSlots.push({
//         startTime: formattedStartTime,
//         endTime: formattedEndTime,
//         doctor: availableDoctors[doctorIndex % availableDoctors.length],
//       });

//       doctorIndex++;
//     }

//     return timeSlots;
//   };

//   const handleBookNowClick = () => {
//     setStep(2);
//   };

//   const handleDaySelection = async (day) => {
//     setSelectedDay(day);
//     const timeSlots = generateTimeSlots("08:30", "17:30");
//     setAvailableTimes(timeSlots);
//     setStep(3);
//   };

//   const handleTimeSelection = (time) => {
//     setSelectedTime(time);
//     setSelectedDoctor(time.doctor);
//     setStep(4);
//   };

//   const handleBookingConfirmation = async () => {
//     if (!selectedTime || !selectedDoctor || !selectedDay || !user) return;

//     const appointmentRef = collection(firestore, "ClinicAppointments");
//     await addDoc(appointmentRef, {
//       patientName: user.additionalData.fullname,
//       doctorName: selectedDoctor.fullname,
//       doctorImage: selectedDoctor.image,
//       clinicName: matchingClinic.ClinicName,
//       day: format(selectedDay, "EEEE, MMMM do yyyy"),
//       time: `${selectedTime.startTime} - ${selectedTime.endTime}`,
//       userId: user.uid,
//       doctorId: selectedDoctor.id,
//     });

//     alert(`Booking confirmed with Dr. ${selectedDoctor.fullname} on ${format(selectedDay, "EEEE, MMMM do yyyy")} at ${selectedTime.startTime} - ${selectedTime.endTime}`);
//     setStep(1);
//   };

//   return (
//     <div>
//       <div className="my-booking-container">
//         <h3>Available Clinic:</h3>
//         {matchingClinic && step === 1 && (
//           <div className="myclinic-card">
//             <img src={matchingClinic.image} alt={matchingClinic.ClinicName} className="clinic-image" />
//             <div className="myclinic-title">
//               <h4>{matchingClinic.ClinicName}</h4>
//               <p>{matchingClinic.Location}</p>
//               <button className="myclinic-button" onClick={handleBookNowClick}>Book Now</button>
//             </div>
//           </div>
//         )}
//         {step === 2 && (
//           <div className="day-selection-container">
//             <h4>Select Day</h4>
//             <div className="day-options">
//               {availableDays.map((day, index) => (
//                 <button key={index} className="day-button" onClick={() => handleDaySelection(day)}>
//                   {format(day, "EEEE, MMMM do yyyy")}
//                 </button>
//               ))}
//             </div>
//           </div>
//         )}
//         {step === 3 && (
//           <div className="time-selection-container">
//             <h4>Select Time for {format(selectedDay, "EEEE, MMMM do yyyy")}</h4>
//             <div className="time-options">
//               {availableTimes.map((time, index) => (
//                 <button key={index} className="time-button" onClick={() => handleTimeSelection(time)}>
//                   {time.startTime} - {time.endTime}
//                 </button>
//               ))}
//             </div>
//           </div>
//         )}
//         {step === 3 && (
//           <div className="doctor-cards">
//             <h4>Available Doctors</h4>
//             <div className="ContainerDoc">
//               {availableDoctors.map((doctor, index) => (
//                 <div key={doctor.id} className="cards-doc">
//                   <div className="card-image-container">
//                     <img src={doctor.image} alt={doctor.fullname} style={{ width: '95%', height: '55%' }} />
//                   </div>
//                   <p className="title1">{doctor.fullname}</p>
//                   <button className="button1" onClick={() => handleTimeSelection(selectedTime)}>
//                     Select Doctor
//                   </button>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}
//         {step === 4 && (
//           <div className="confirmation-container">
//             <h4>Confirm Booking</h4>
//             <p>Doctor: {selectedDoctor.fullname}</p>
//             <p>Time: {selectedTime.startTime} - {selectedTime.endTime}</p>
//             <button className="confirm-button" onClick={handleBookingConfirmation}>Confirm Booking</button>
//           </div>
//         )}
//         {!matchingClinic && step === 1 && <p>There is no clinic available, you must book an initial examination first.</p>}
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default MyBooking;



// import React, { useEffect, useState } from "react";
// import { collection, query, where, getDocs, doc, getDoc, addDoc } from "firebase/firestore";
// import { firestore } from "../../firebase";
// import Footer from "../../components/Footer/footer";
// import { useUser } from "../../contexts/UserContext";
// import { format, eachDayOfInterval, addDays, startOfToday } from "date-fns";
// import "./mybooking.css"; // Import your CSS file

// const MyBooking = () => {
//   const [matchingClinic, setMatchingClinic] = useState(null);
//   const { user } = useUser();
//   const [requiredTreatmentCondition, setRequiredTreatmentCondition] = useState([]);
//   const [selectedDay, setSelectedDay] = useState(null);
//   const [availableTimes, setAvailableTimes] = useState([]);
//   const [availableDoctors, setAvailableDoctors] = useState([]);
//   const [selectedTime, setSelectedTime] = useState(null);
//   const [selectedDoctor, setSelectedDoctor] = useState(null);
//   const [step, setStep] = useState(1); // 1: Clinic, 2: Days, 3: Times and Doctors, 4: Confirmation

//   useEffect(() => {
//     const fetchPatientData = async () => {
//       try {
//         if (!user || !user.uid) {
//           console.error("User is not set correctly or does not have a uid");
//           return;
//         }

//         const patientDocRef = doc(firestore, "Patients", user.uid);
//         const patientDoc = await getDoc(patientDocRef);

//         if (!patientDoc.exists()) {
//           console.error("No patient found with the given uid");
//           return;
//         }

//         const patientData = patientDoc.data();
//         console.log("Patient Data:", patientData);
//         setRequiredTreatmentCondition(patientData.requiredTreatmentCondition);

//         const clinicsCollectionRef = collection(firestore, "Clinics");
//         const clinicsQuery = query(
//           clinicsCollectionRef,
//           where("RequiredTreatment", "array-contains", patientData.requiredTreatmentCondition)
//         );
//         const clinicDocs = await getDocs(clinicsQuery);

//         if (clinicDocs.empty) {
//           console.log("No matching clinic found for the required treatment condition");
//           setMatchingClinic(null);
//           return;
//         }

//         const clinicData = clinicDocs.docs[0].data();
//         console.log("Matching Clinic Data:", clinicData);
//         setMatchingClinic(clinicData);

//         // Fetch available doctors
//         const doctorIds = clinicData.doctors;
//         if (doctorIds && doctorIds.length > 0) {
//           const doctorsQuery = query(collection(firestore, "Doctors"), where("__name__", "in", doctorIds));
//           const doctorsSnapshot = await getDocs(doctorsQuery);
//           const doctors = doctorsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//           setAvailableDoctors(doctors);
//         } else {
//           console.log("No doctors found for the clinic.");
//         }
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     if (user && user.uid) {
//       fetchPatientData();
//     }
//   }, [user]);

//   const getNextWeekdays = (daysToShow) => {
//     const today = startOfToday();
//     const days = eachDayOfInterval({ start: today, end: addDays(today, 14) })
//       .filter((day) => {
//         const dayOfWeek = new Date(day).getDay();
//         return dayOfWeek !== 5 && dayOfWeek !== 6; // Skip Friday and Saturday
//       })
//       .slice(0, daysToShow);
//     return days;
//   };

//   const availableDays = getNextWeekdays(7); // Get next 7 weekdays

//   const formatTime = (hour, minute) => {
//     const meridiem = hour >= 12 ? "PM" : "AM";
//     const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
//     const formattedMinute = minute.toString().padStart(2, "0");
//     return `${formattedHour}:${formattedMinute} ${meridiem}`;
//   };

//   const generateTimeSlots = (startTime, endTime) => {
//     const timeSlots = [];
//     const [startHour, startMinute] = startTime.split(":").map(Number);
//     let [endHour, endMinute] = endTime.split(":").map(Number);

//     if (endHour < startHour || (endHour === startHour && endMinute < startMinute)) {
//       endHour += 24; // Add 24 hours to end time
//     }

//     let currentHour = startHour;
//     let currentMinute = startMinute;

//     while (currentHour < endHour || (currentHour === endHour && currentMinute < endMinute)) {
//       const formattedStartTime = formatTime(currentHour, currentMinute);

//       currentMinute += 90; // Increment by 90 minutes (1 hour and 30 minutes)
//       if (currentMinute >= 60) {
//         currentHour += Math.floor(currentMinute / 60);
//         currentMinute = currentMinute % 60;
//       }

//       const formattedEndTime = formatTime(currentHour, currentMinute);

//       timeSlots.push({
//         startTime: formattedStartTime,
//         endTime: formattedEndTime,
//       });
//     }

//     return timeSlots;
//   };

//   const fetchBookedTimes = async (clinicName, day) => {
//     const dayString = format(day, "EEEE, MMMM do yyyy");
//     const appointmentsQuery = query(
//       collection(firestore, "ClinicAppointments"),
//       where("clinicName", "==", clinicName),
//       where("day", "==", dayString)
//     );
//     const appointmentsSnapshot = await getDocs(appointmentsQuery);

//     const bookedTimes = appointmentsSnapshot.docs.map(doc => doc.data().time);
//     return bookedTimes;
//   };

//   const handleBookNowClick = () => {
//     setStep(2);
//   };

//   const handleDaySelection = async (day) => {
//     setSelectedDay(day);
//     const timeSlots = generateTimeSlots("08:30", "17:30");

//     const bookedTimes = await fetchBookedTimes(matchingClinic.ClinicName, day);
//     const updatedTimeSlots = timeSlots.map(slot => {
//       const slotTime = `${slot.startTime} - ${slot.endTime}`;
//       const isAvailable = !bookedTimes.includes(slotTime);
//       return { ...slot, available: isAvailable };
//     });

//     setAvailableTimes(updatedTimeSlots);
//   };

//   const handleTimeSelection = (time, index) => {
//     if (time.available) {
//       setSelectedTime(time);
//       setSelectedDoctor(availableDoctors[index % availableDoctors.length]);
//     } else {
//       alert("This time slot is already booked. Please choose another time.");
//     }
//   };

//   const handleDoctorSelection = () => {
//     setStep(4);
//   };

//   const handleBookingConfirmation = async () => {
//     if (!selectedTime || !selectedDoctor || !selectedDay || !user) return;

//     const appointmentRef = collection(firestore, "ClinicAppointments");
//     await addDoc(appointmentRef, {
//       patientName: user.additionalData.fullname,
//       doctorName: selectedDoctor.fullname,
//       doctorImage: selectedDoctor.image,
//       clinicName: matchingClinic.ClinicName,
//       day: format(selectedDay, "EEEE, MMMM do yyyy"),
//       time: `${selectedTime.startTime} - ${selectedTime.endTime}`,
//       userId: user.uid,
//       doctorId: selectedDoctor.id,
//     });

//     alert(`Booking confirmed with Dr. ${selectedDoctor.fullname} on ${format(selectedDay, "EEEE, MMMM do yyyy")} at ${selectedTime.startTime} - ${selectedTime.endTime}`);
//     setStep(1);
//   };

//   const handleBackClick = () => {
//     setStep(step - 1);
//   };

//   return (
//     <div>
//       <div className="my-booking-container">
//         {step === 1 && (
//           <>
//             <h3>Available Clinic:</h3>
//             {matchingClinic ? (
//               <div className="myclinic-card">
//                 <img src={matchingClinic.image} alt={matchingClinic.ClinicName} className="clinic-image" />
//                 <div className="myclinic-title">
//                   <h4>{matchingClinic.ClinicName}</h4>
//                   <p>{matchingClinic.Location}</p>
//                   <button className="myclinic-button" onClick={handleBookNowClick}>Book Now</button>
//                 </div>
//               </div>
//             ) : (
//               <p>There is no clinic available, you must book an initial examination first.</p>
//             )}
//           </>
//         )}
//         {step === 2 && (
//           <div className="day-selection-container">
//             <h4>Select Day</h4>
//             <div className="day-options">
//               {availableDays.map((day, index) => (
//                 <button key={index} className="day-button1" onClick={() => handleDaySelection(day)}>
//                   {format(day, "EEEE, MMMM do yyyy")}
//                 </button>
//               ))}
//             </div>
//             {selectedDay && (
//               <div className="time-doctor-selection-container">
//                 <div className="time-selection-container">
//                   <h4>Select Time for {format(selectedDay, "EEEE, MMMM do yyyy")}</h4>
//                   <div className="time-options">
//                     {availableTimes.map((time, index) => (
//                       <button key={index} className={`time-button1 ${time.available ? '' : 'booked'}`} onClick={() => handleTimeSelection(time, index)} disabled={!time.available}>
//                         {time.startTime} - {time.endTime}
//                       </button>
//                     ))}
//                   </div>
//                 </div>
//                 <div className="doctor-cards">
//                   <h4>Available Doctors</h4>
//                   <div className="ContainerDoc">
//                     {availableDoctors.map((doctor, index) => (
//                       <div id={`doctor-${doctor.id}`} key={doctor.id} className={`cards-doc ${selectedDoctor === doctor ? 'selected' : ''}`}>
//                         <div className="card-image-container">
//                           <img src={doctor.image} alt={doctor.fullname} style={{ width: '95%', height: '55%' }} />
//                         </div>
//                         <p className="title1">{doctor.fullname}</p>
//                         <button className="button1" onClick={handleDoctorSelection}>
//                           Select Doctor
//                         </button>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             )}
//             <button className="backk-button" onClick={handleBackClick}>Back</button>
//           </div>
//         )}
//         {step === 4 && (
//           <div className="confirmation-container">
//             <h4>Confirm Booking</h4>
//             <p>Doctor: {selectedDoctor.fullname}</p>
//             <p>Time: {selectedTime.startTime} - {selectedTime.endTime}</p>
//             <button className="confirm-button" onClick={handleBookingConfirmation}>Confirm Booking</button>
//             <button className="backk-button" onClick={handleBackClick}>Back</button>
//           </div>
//         )}
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default MyBooking;

// import React, { useEffect, useState } from "react";
// import { collection, query, where, getDocs, doc, getDoc, addDoc } from "firebase/firestore";
// import { firestore } from "../../firebase";
// import Footer from "../../components/Footer/footer";
// import { useUser } from "../../contexts/UserContext";
// import { format, eachDayOfInterval, addDays, startOfToday } from "date-fns";
// import "./mybooking.css"; 

// const MyBooking = () => {
//   const [matchingClinic, setMatchingClinic] = useState(null);
//   const { user } = useUser();
//   const [requiredTreatmentCondition, setRequiredTreatmentCondition] = useState([]);
//   const [selectedDay, setSelectedDay] = useState(null);
//   const [availableTimes, setAvailableTimes] = useState([]);
//   const [availableDoctors, setAvailableDoctors] = useState([]);
//   const [selectedTime, setSelectedTime] = useState(null);
//   const [selectedDoctor, setSelectedDoctor] = useState(null);
//   const [step, setStep] = useState(1); 
//   const [showSelectButton, setShowSelectButton] = useState(false); // New state for showing the select button

//   useEffect(() => {
//     const fetchPatientData = async () => {
//       try {
//         if (!user || !user.uid) {
//           console.error("User is not set correctly or does not have a uid");
//           return;
//         }

//         const patientDocRef = doc(firestore, "Patients", user.uid);
//         const patientDoc = await getDoc(patientDocRef);

//         if (!patientDoc.exists()) {
//           console.error("No patient found with the given uid");
//           return;
//         }

//         const patientData = patientDoc.data();
//         console.log("Patient Data:", patientData);
//         setRequiredTreatmentCondition(patientData.requiredTreatmentCondition);

//         const clinicsCollectionRef = collection(firestore, "Clinics");
//         const clinicsQuery = query(
//           clinicsCollectionRef,
//           where("RequiredTreatment", "array-contains", patientData.requiredTreatmentCondition)
//         );
//         const clinicDocs = await getDocs(clinicsQuery);

//         if (clinicDocs.empty) {
//           console.log("No matching clinic found for the required treatment condition");
//           setMatchingClinic(null);
//           return;
//         }

//         const clinicData = clinicDocs.docs[0].data();
//         console.log("Matching Clinic Data:", clinicData);
//         setMatchingClinic(clinicData);

//         // Fetch available doctors
//         const doctorIds = clinicData.doctors;
//         if (doctorIds && doctorIds.length > 0) {
//           const doctorsQuery = query(collection(firestore, "Doctors"), where("__name__", "in", doctorIds));
//           const doctorsSnapshot = await getDocs(doctorsQuery);
//           const doctors = doctorsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//           setAvailableDoctors(doctors);
//         } else {
//           console.log("No doctors found for the clinic.");
//         }
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     if (user && user.uid) {
//       fetchPatientData();
//     }
//   }, [user]);

//   const getNextWeekdays = (daysToShow) => {
//     const today = startOfToday();
//     const days = eachDayOfInterval({ start: today, end: addDays(today, 14) })
//       .filter((day) => {
//         const dayOfWeek = new Date(day).getDay();
//         return dayOfWeek !== 5 && dayOfWeek !== 6; // Skip Friday and Saturday
//       })
//       .slice(0, daysToShow);
//     return days;
//   };

//   const availableDays = getNextWeekdays(7); // Get next 7 weekdays

//   const formatTime = (hour, minute) => {
//     const meridiem = hour >= 12 ? "PM" : "AM";
//     const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
//     const formattedMinute = minute.toString().padStart(2, "0");
//     return `${formattedHour}:${formattedMinute} ${meridiem}`;
//   };

//   const generateTimeSlots = (startTime, endTime) => {
//     const timeSlots = [];
//     const [startHour, startMinute] = startTime.split(":").map(Number);
//     let [endHour, endMinute] = endTime.split(":").map(Number);

//     if (endHour < startHour || (endHour === startHour && endMinute < startMinute)) {
//       endHour += 24; // Add 24 hours to end time
//     }

//     let currentHour = startHour;
//     let currentMinute = startMinute;

//     while (currentHour < endHour || (currentHour === endHour && currentMinute < endMinute)) {
//       const formattedStartTime = formatTime(currentHour, currentMinute);

//       currentMinute += 90; // Increment by 90 minutes (1 hour and 30 minutes)
//       if (currentMinute >= 60) {
//         currentHour += Math.floor(currentMinute / 60);
//         currentMinute = currentMinute % 60;
//       }

//       const formattedEndTime = formatTime(currentHour, currentMinute);

//       timeSlots.push({
//         startTime: formattedStartTime,
//         endTime: formattedEndTime,
//       });
//     }

//     return timeSlots;
//   };

//   const fetchBookedTimes = async (clinicName, day) => {
//     const dayString = format(day, "EEEE, MMMM do yyyy");
//     const appointmentsQuery = query(
//       collection(firestore, "ClinicAppointments"),
//       where("clinicName", "==", clinicName),
//       where("day", "==", dayString)
//     );
//     const appointmentsSnapshot = await getDocs(appointmentsQuery);

//     const bookedTimes = appointmentsSnapshot.docs.map(doc => doc.data().time);
//     return bookedTimes;
//   };

//   const handleBookNowClick = () => {
//     setStep(2);
//   };

//   const handleDaySelection = async (day) => {
//     setSelectedDay(day);
//     const timeSlots = generateTimeSlots("08:30", "17:30");

//     const bookedTimes = await fetchBookedTimes(matchingClinic.ClinicName, day);
//     const updatedTimeSlots = timeSlots.map(slot => {
//       const slotTime = `${slot.startTime} - ${slot.endTime}`;
//       const isAvailable = !bookedTimes.includes(slotTime);
//       return { ...slot, available: isAvailable };
//     });

//     setAvailableTimes(updatedTimeSlots);
//     setShowSelectButton(false); // Reset the showSelectButton state when a new day is selected
//   };

//   const handleTimeSelection = (time, index) => {
//     if (time.available) {
//       setSelectedTime(time);
//       setSelectedDoctor(availableDoctors[index % availableDoctors.length]);
//       setShowSelectButton(true); // Show the select button when a time is selected
//     } else {
//       alert("This time slot is already booked. Please choose another time.");
//     }
//   };

//   const handleDoctorSelection = () => {
//     setStep(4);
//   };

//   const handleBookingConfirmation = async () => {
//     if (!selectedTime || !selectedDoctor || !selectedDay || !user) return;

//     const appointmentRef = collection(firestore, "ClinicAppointments");
//     await addDoc(appointmentRef, {
//       patientName: user.additionalData.fullname,
//       doctorName: selectedDoctor.fullname,
//       doctorImage: selectedDoctor.image,
//       clinicName: matchingClinic.ClinicName,
//       day: format(selectedDay, "EEEE, MMMM do yyyy"),
//       time: `${selectedTime.startTime} - ${selectedTime.endTime}`,
//       userId: user.uid,
//       doctorId: selectedDoctor.id,
//     });

//     alert(`Booking confirmed with Dr. ${selectedDoctor.fullname} on ${format(selectedDay, "EEEE, MMMM do yyyy")} at ${selectedTime.startTime} - ${selectedTime.endTime}`);
//     setStep(1);
//   };

//   const handleBackClick = () => {
//     if (step === 4) {
//       setStep(2); // Go back to the day selection page
//     } else {
//       setStep(step - 1);
//     }
//   };

//   return (
//     <div>
//       <div className="my-booking-container">
//         {step === 1 && (
//           <>
//             <h3>Available Clinic:</h3>
//             {matchingClinic ? (
//               <div className="myclinic-card">
//                 <img src={matchingClinic.image} alt={matchingClinic.ClinicName} className="clinic-image" />
//                 <div className="myclinic-title">
//                   <h4>{matchingClinic.ClinicName}</h4>
//                   <p>{matchingClinic.Location}</p>
//                   <button className="myclinic-button" onClick={handleBookNowClick}>Book Now</button>
//                 </div>
//               </div>
//             ) : (
//               <p>There is no clinic available, you must book an initial examination first.</p>
//             )}
//           </>
//         )}
//         {step === 2 && (
//           <div className="day-selection-container">
//             <h4>Select Day</h4>
//             <div className="day-options">
//               {availableDays.map((day, index) => (
//                 <button key={index} className="day-button1" onClick={() => handleDaySelection(day)}>
//                   {format(day, "EEEE, MMMM do yyyy")}
//                 </button>
//               ))}
//             </div>
//             {selectedDay && (
//               <div className="time-doctor-selection-container">
//                 <div className="time-selection-container">
//                   <h4>Select Time for {format(selectedDay, "EEEE, MMMM do yyyy")}</h4>
//                   <div className="time-options">
//                     {availableTimes.map((time, index) => (
//                       <button key={index} className={`time-button1 ${time.available ? '' : 'booked'}`} onClick={() => handleTimeSelection(time, index)} disabled={!time.available}>
//                         {time.startTime} - {time.endTime}
//                       </button>
//                     ))}
//                   </div>
//                 </div>
//                 <div className="doctor-cards">
//                   <h4>Available Doctors</h4>
//                   <div className="ContainerDoc">
//                     {availableDoctors.map((doctor, index) => (
//                       <div id={`doctor-${doctor.id}`} key={doctor.id} className={`cards-doc ${selectedDoctor === doctor ? 'selected' : ''}`}>
//                         <div className="card-image-container">
//                           <img src={doctor.image} alt={doctor.fullname}  />
//                         </div>
//                         <p className="title1">{doctor.fullname}</p>
//                         <p className="specialization">{doctor.Specialization}</p>
//                         {showSelectButton && selectedDoctor === doctor && ( // Show button only if a time is selected and the doctor is the selected one
//                           <button className="button1" onClick={handleDoctorSelection}>
//                             Select Doctor
//                           </button>
//                         )}
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             )}
//             <button className="backk-button" onClick={handleBackClick}>Back</button>
//           </div>
//         )}
//         {step === 4 && (
//           <div> 
//           <div className="confirmation-container">
//             <div className="selected-doctor-image">
//               <img src={selectedDoctor.image} alt={selectedDoctor.fullname} className="selected-doctor-image" />
//               </div>
//               <div className="selected-doctor"> 
//               <h4>About {selectedDoctor.fullname} </h4>
//               <p>{selectedDoctor.Description}</p>
//               <p> <strong>Education:</strong>{selectedDoctor.Education}</p>
//               <p><strong>Experience: </strong>{selectedDoctor.Experience}</p>
//               </div>
//             <div className="confirmBooking"> 
//             <p> <strong>doctor name:</strong>{selectedDoctor.fullname} </p> 
//             <p><strong>Clinic:</strong> {matchingClinic.ClinicName}</p>
//             <p> <strong>Time:</strong>{selectedTime.startTime} - {selectedTime.endTime}</p>
//             <button className="confirm-button2" onClick={handleBookingConfirmation}>Confirm Booking</button>
//             </div>
//           </div>
//             <button className="backk-button" onClick={handleBackClick}>Back</button>
//             </div>
//         )}
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default MyBooking;

// import React, { useEffect, useState } from "react";
// import Aos from "aos";
// import "aos/dist/aos.css";
// import { collection, query, where, getDocs, doc, getDoc, addDoc } from "firebase/firestore";
// import { firestore } from "../../firebase";
// import Footer from "../../components/Footer/footer";
// import { useUser } from "../../contexts/UserContext";
// import { format, eachDayOfInterval, addDays, startOfToday } from "date-fns";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import "./mybooking.css";

// const MyBooking = () => {
//   const [matchingClinic, setMatchingClinic] = useState(null);
//   const { user } = useUser();
//   const [requiredTreatmentCondition, setRequiredTreatmentCondition] = useState([]);
//   const [selectedDay, setSelectedDay] = useState(null);
//   const [availableTimes, setAvailableTimes] = useState([]);
//   const [availableDoctors, setAvailableDoctors] = useState([]);
//   const [selectedTime, setSelectedTime] = useState(null);
//   const [selectedDoctor, setSelectedDoctor] = useState(null);
//   const [step, setStep] = useState(1); 
//   const [showSelectButton, setShowSelectButton] = useState(false); 

//   useEffect(() => {
//     const fetchPatientData = async () => {
//       try {
//         if (!user || !user.uid) {
//           console.error("User is not set correctly or does not have a uid");
//           return;
//         }

//         const patientDocRef = doc(firestore, "Patients", user.uid);
//         const patientDoc = await getDoc(patientDocRef);

//         if (!patientDoc.exists()) {
//           console.error("No patient found with the given uid");
//           return;
//         }

//         const patientData = patientDoc.data();
//         console.log("Patient Data:", patientData);
//         setRequiredTreatmentCondition(patientData.requiredTreatmentCondition);

//         const clinicsCollectionRef = collection(firestore, "Clinics");
//         const clinicsQuery = query(
//           clinicsCollectionRef,
//           where("RequiredTreatment", "array-contains", patientData.requiredTreatmentCondition)
//         );
//         const clinicDocs = await getDocs(clinicsQuery);

//         if (clinicDocs.empty) {
//           console.log("No matching clinic found for the required treatment condition");
//           setMatchingClinic(null);
//           return;
//         }

//         const clinicData = clinicDocs.docs[0].data();
//         console.log("Matching Clinic Data:", clinicData);
//         setMatchingClinic(clinicData);

//         const doctorIds = clinicData.doctors;
//         if (doctorIds && doctorIds.length > 0) {
//           const doctorsQuery = query(collection(firestore, "Doctors"), where("__name__", "in", doctorIds));
//           const doctorsSnapshot = await getDocs(doctorsQuery);
//           const doctors = doctorsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//           setAvailableDoctors(doctors);
//         } else {
//           console.log("No doctors found for the clinic.");
//         }
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     if (user && user.uid) {
//       fetchPatientData();
//     }
//   }, [user]);

//   const getNextWeekdays = (daysToShow) => {
//     const today = startOfToday();
//     const days = eachDayOfInterval({ start: today, end: addDays(today, 14) })
//       .filter((day) => {
//         const dayOfWeek = new Date(day).getDay();
//         return dayOfWeek !== 5 && dayOfWeek !== 6; 
//       })
//       .slice(0, daysToShow);
//     return days;
//   };

//   const availableDays = getNextWeekdays(7); 

//   const formatTime = (hour, minute) => {
//     const meridiem = hour >= 12 ? "PM" : "AM";
//     const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
//     const formattedMinute = minute.toString().padStart(2, "0");
//     return `${formattedHour}:${formattedMinute} ${meridiem}`;
//   };

//   const generateTimeSlots = (startTime, endTime) => {
//     const timeSlots = [];
//     const [startHour, startMinute] = startTime.split(":").map(Number);
//     let [endHour, endMinute] = endTime.split(":").map(Number);

//     if (endHour < startHour || (endHour === startHour && endMinute < startMinute)) {
//       endHour += 24; 
//     }

//     let currentHour = startHour;
//     let currentMinute = startMinute;

//     while (currentHour < endHour || (currentHour === endHour && currentMinute < endMinute)) {
//       const formattedStartTime = formatTime(currentHour, currentMinute);

//       currentMinute += 90; 
//       if (currentMinute >= 60) {
//         currentHour += Math.floor(currentMinute / 60);
//         currentMinute = currentMinute % 60;
//       }

//       const formattedEndTime = formatTime(currentHour, currentMinute);

//       timeSlots.push({
//         startTime: formattedStartTime,
//         endTime: formattedEndTime,
//       });
//     }

//     return timeSlots;
//   };

//   const fetchBookedTimes = async (clinicName, day) => {
//     const dayString = format(day, "EEEE, MMMM do yyyy");
//     const appointmentsQuery = query(
//       collection(firestore, "ClinicAppointments"),
//       where("clinicName", "==", clinicName),
//       where("day", "==", dayString)
//     );
//     const appointmentsSnapshot = await getDocs(appointmentsQuery);

//     const bookedTimes = appointmentsSnapshot.docs.map(doc => doc.data().time);
//     return bookedTimes;
//   };

//   const handleBookNowClick = () => {
//     setStep(2);
//   };

//   const handleDaySelection = async (day) => {
//     setSelectedDay(day);
//     const timeSlots = generateTimeSlots("08:30", "17:30");

//     const bookedTimes = await fetchBookedTimes(matchingClinic.ClinicName, day);
//     const updatedTimeSlots = timeSlots.map(slot => {
//       const slotTime = `${slot.startTime} - ${slot.endTime}`;
//       const isAvailable = !bookedTimes.includes(slotTime);
//       return { ...slot, available: isAvailable };
//     });

//     setAvailableTimes(updatedTimeSlots);
//     setShowSelectButton(false); 
//   };

//   const handleTimeSelection = (time, index) => {
//     if (time.available) {
//       setSelectedTime(time);
//       setSelectedDoctor(availableDoctors[index % availableDoctors.length]);
//       setShowSelectButton(true); 
//     } else {
//       alert("This time slot is already booked. Please choose another time.");
//     }
//   };

//   const handleDoctorSelection = () => {
//     setStep(4);
//   };

//   // const handleBookingConfirmation = async () => {
//   //   if (!selectedTime || !selectedDoctor || !selectedDay || !user) return;

//   //   const appointmentRef = collection(firestore, "ClinicAppointments");
//   //   await addDoc(appointmentRef, {
//   //     patientName: user.additionalData.fullname,
//   //     doctorName: selectedDoctor.fullname,
//   //     clinicName: matchingClinic.ClinicName,
//   //     day: format(selectedDay, "EEEE, MMMM do yyyy"),
//   //     time: `${selectedTime.startTime} - ${selectedTime.endTime}`,
//   //     userId: user.uid,
      

//   //     doctorId: selectedDoctor.id,
//   //   });

//   //   toast.success(`Booking confirmed with  ${selectedDoctor.fullname} on ${format(selectedDay, "EEEE, MMMM do yyyy")} at ${selectedTime.startTime} - ${selectedTime.endTime}`, {
//   //     position: "top-center",
//   //     autoClose: 5000,
//   //     hideProgressBar: false,
//   //     closeOnClick: true,
//   //     pauseOnHover: true,
//   //     draggable: true,
//   //     progress: undefined,
//   //   });
//   //   setStep(1);
//   // };

//   const handleBackClick = () => {
//     if (step === 4) {
//       setStep(2); 
//     } else {
//       setStep(step - 1);
//     }
//   };

//   return (
//     <div>
//       <div className="my-booking-container">
//         {step === 1 && (
//           <>
//             <h3>Available Clinic:</h3>
//             {matchingClinic ? (
//               <div className="myclinic-card">
//                 <img src={matchingClinic.image} alt={matchingClinic.ClinicName} className="clinic-image" />
//                 <div className="myclinic-title">
//                   <h4>{matchingClinic.ClinicName}</h4>
//                   <p>{matchingClinic.Location}</p>
//                   <button className="myclinic-button" onClick={handleBookNowClick}>Book Now</button>
//                 </div>
//               </div>
//             ) : (
//               <p>There is no clinic available, you must book an initial examination first.</p>
//             )}
//           </>
//         )}
//         {step === 2 && (
//           <div className="day-selection-container">
//             <h4>Select Day</h4>
//             <div className="day-options">
//               {availableDays.map((day, index) => (
//                 <button key={index} className="day-button1" onClick={() => handleDaySelection(day)}>
//                   {format(day, "EEEE, MMMM do yyyy")}
//                 </button>
//               ))}
//             </div>
//             {selectedDay && (
//               <div className="time-doctor-selection-container">
//                 <div className="time-selection-container">
//                   <h4>Select Time for {format(selectedDay, "EEEE, MMMM do yyyy")}</h4>
//                   <div className="time-options">
//                     {availableTimes.map((time, index) => (
//                       <button key={index} className={`time-button1 ${time.available ? '' : 'booked'}`} onClick={() => handleTimeSelection(time, index)} disabled={!time.available}>
//                         {time.startTime} - {time.endTime}
//                       </button>
//                     ))}
//                   </div>
//                 </div>
//                 <div className="doctor-cards">
//                   <h4>Available Doctors</h4>
//                   <div className="ContainerDoc">
//                     {availableDoctors.map((doctor, index) => (
//                       <div id={`doctor-${doctor.id}`} key={doctor.id} className={`cards-doc ${selectedDoctor === doctor ? 'selected' : ''}`}>
//                         <div className="card-image-container">
//                           <img src={doctor.image} alt={doctor.fullname}  />
//                         </div>
//                         <p className="title1">{doctor.fullname}</p>
//                         <p className="specialization">{doctor.Specialization}</p>
//                         {showSelectButton && selectedDoctor === doctor && ( 
//                           <button className="button1" onClick={handleDoctorSelection}>
//                             Select Doctor
//                           </button>
//                         )}
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             )}
//             <button className="backk-button" onClick={handleBackClick}>Back</button>
//           </div>
//         )}
//         {step === 4 && (
//           <div> 
//           <div className="confirmation-container">
//             <div className="selected-doctor-info">
//               <img src={selectedDoctor.image} alt={selectedDoctor.fullname} className="selected-doctor-image" />
//               </div>
//               <div className="selected-doctor"> 
//               <h4>About {selectedDoctor.fullname} </h4>
//               <p>{selectedDoctor.Description}</p>
//               <p> <strong>Education:</strong>{selectedDoctor.Education}</p>
//               <p><strong>Experience: </strong>{selectedDoctor.Experience}</p>
//               </div>
//             <div className="booking-card"> 
//             <p> <strong>Doctor name:</strong>{selectedDoctor.fullname} </p> 
//             <p><strong>Clinic:</strong> {matchingClinic.ClinicName}</p>
//             <p> <strong>Time:</strong>{selectedTime.startTime} - {selectedTime.endTime}</p>
//             <button className="confirm-button2" onClick={handleBookingConfirmation}>Confirm Booking</button>
//             </div>
//           </div>
//             <button className="backk-button" onClick={handleBackClick}>Back</button>
//             </div>
//         )}
//       </div>
//       <Footer />
//       <ToastContainer />
//     </div>
//   );
// };

// export default MyBooking;

import React, { useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
  addDoc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { firestore, auth } from "../../firebase";
import Footer from "../../components/Footer/footer";
import { useUser } from "../../contexts/UserContext";
import { format, eachDayOfInterval, addDays, startOfToday } from "date-fns";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./mybooking.css";
import { FaComment  } from "react-icons/fa6";
import {FaClinicMedical,FaArrowRight } from "react-icons/fa";

import { useNavigate } from "react-router-dom";

const MyBooking = () => {
  const [matchingClinic, setMatchingClinic] = useState(null);
  const { user } = useUser();
  const [requiredTreatmentCondition, setRequiredTreatmentCondition] = useState(
    []
  );
  const [selectedDay, setSelectedDay] = useState(null);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [availableDoctors, setAvailableDoctors] = useState([]);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [step, setStep] = useState(1);
  const [showSelectButton, setShowSelectButton] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        if (!user || !user.uid) {
          console.error("User is not set correctly or does not have a uid");
          return;
        }

        const patientDocRef = doc(firestore, "Patients", user.uid);
        const patientDoc = await getDoc(patientDocRef);

        if (!patientDoc.exists()) {
          console.error("No patient found with the given uid");
          return;
        }

        const patientData = patientDoc.data();
        console.log("Patient Data:", patientData);
        setRequiredTreatmentCondition(patientData.requiredTreatmentCondition);

        const clinicsCollectionRef = collection(firestore, "Clinics");
        const clinicsQuery = query(
          clinicsCollectionRef,
          where(
            "RequiredTreatment",
            "array-contains",
            patientData.requiredTreatmentCondition
          )
        );
        const clinicDocs = await getDocs(clinicsQuery);

        if (clinicDocs.empty) {
          console.log(
            "No matching clinic found for the required treatment condition"
          );
          setMatchingClinic(null);
          return;
        }

        const clinicData = clinicDocs.docs[0].data();
        console.log("Matching Clinic Data:", clinicData);
        setMatchingClinic(clinicData);

        const doctorIds = clinicData.doctors;
        if (doctorIds && doctorIds.length > 0) {
          const doctorsQuery = query(
            collection(firestore, "Doctors"),
            where("__name__", "in", doctorIds)
          );
          const doctorsSnapshot = await getDocs(doctorsQuery);
          const doctors = doctorsSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setAvailableDoctors(doctors);
        } else {
          console.log("No doctors found for the clinic.");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (user && user.uid) {
      fetchPatientData();
    }
  }, [user]);

  const startChat = async (doctorId, doctorName) => {
    const user = auth.currentUser;
    if (user) {
      const chatRef = collection(firestore, "Chats");
      const chatQuery = query(
        chatRef,
        where("participants", "array-contains", user.uid)
      );

      try {
        const chatSnapshot = await getDocs(chatQuery);
        let chatId = null;

        chatSnapshot.forEach((doc) => {
          const data = doc.data();
          if (data.participants.includes(doctorId)) {
            chatId = doc.id;
          }
        });

        if (!chatId) {
          const newChatDoc = await addDoc(chatRef, {
            participants: [user.uid, doctorId],
            createdAt: new Date(),
          });
          chatId = newChatDoc.id;
        }

        const otherUserDoc = await getDoc(doc(firestore, "Doctors", doctorId));
        const otherUser = otherUserDoc.exists()
          ? otherUserDoc.data()
          : { fullname: doctorName, image: "default-avatar-url" };

        navigate("/Messages", { state: { chatId, otherUser } });
      } catch (error) {
        console.error("Error starting chat: ", error);
      }
    }
  };

  const getNextWeekdays = (daysToShow) => {
    const today = startOfToday();
    const days = eachDayOfInterval({ start: today, end: addDays(today, 14) })
      .filter((day) => {
        const dayOfWeek = new Date(day).getDay();
        return dayOfWeek !== 5 && dayOfWeek !== 6;
      })
      .slice(0, daysToShow);
    return days;
  };

  const availableDays = getNextWeekdays(7);

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

    if (
      endHour < startHour ||
      (endHour === startHour && endMinute < startMinute)
    ) {
      endHour += 24;
    }

    let currentHour = startHour;
    let currentMinute = startMinute;

    while (
      currentHour < endHour ||
      (currentHour === endHour && currentMinute < endMinute)
    ) {
      const formattedStartTime = formatTime(currentHour, currentMinute);

      currentMinute += 90;
      if (currentMinute >= 60) {
        currentHour += Math.floor(currentMinute / 60);
        currentMinute = currentMinute % 60;
      }

      const formattedEndTime = formatTime(currentHour, currentMinute);

      timeSlots.push({
        startTime: formattedStartTime,
        endTime: formattedEndTime,
      });
    }

    return timeSlots;
  };

  const fetchBookedTimes = async (clinicName, day) => {
    const dayString = format(day, "EEEE, MMMM do yyyy");
    const appointmentsQuery = query(
      collection(firestore, "ClinicAppointments"),
      where("clinicName", "==", clinicName),
      where("day", "==", dayString)
    );
    const appointmentsSnapshot = await getDocs(appointmentsQuery);

    const bookedTimes = appointmentsSnapshot.docs.map((doc) => doc.data().time);
    return bookedTimes;
  };

  const handleBookNowClick = () => {
    setStep(2);
  };

  const handleDaySelection = async (day) => {
    setSelectedDay(day);
    const timeSlots = generateTimeSlots("08:30", "17:30");

    const bookedTimes = await fetchBookedTimes(matchingClinic.ClinicName, day);
    const updatedTimeSlots = timeSlots.map((slot) => {
      const slotTime = `${slot.startTime} - ${slot.endTime}`;
      const isAvailable = !bookedTimes.includes(slotTime);
      return { ...slot, available: isAvailable };
    });

    setAvailableTimes(updatedTimeSlots);
    setShowSelectButton(false);
  };

  const handleTimeSelection = (time, index) => {
    if (time.available) {
      setSelectedTime(time);
      setSelectedDoctor(availableDoctors[index % availableDoctors.length]);
      setShowSelectButton(true);
    } else {
      alert("This time slot is already booked. Please choose another time.");
    }
  };

  const handleDoctorSelection = () => {
    setStep(4);
  };

  const handleBookingConfirmation = async () => {
    if (!selectedTime || !selectedDoctor || !selectedDay || !user) return;

    const doctorDoc = await getDoc(
      doc(firestore, "Doctors", selectedDoctor.id)
    );
    const doctorData = doctorDoc.exists() ? doctorDoc.data() : null;

    if (!doctorData) {
      console.error("Doctor data not found");
      return;
    }

    const notification = {
      name: user.additionalData.fullname || "Unknown",
      avatar:
        user.additionalData.image ||
        "https://firebasestorage.googleapis.com/v0/b/dental-aaup.appspot.com/o/default.jpg?alt=media&token=cf0548b6-f7cb-410d-bd1d-f17a83b541d7",
      message: `You have a new appointment request from ${
        user.additionalData.fullname
      } on ${format(selectedDay, "EEEE, MMMM do yyyy")} at ${
        selectedTime.startTime
      } - ${selectedTime.endTime}`,
      timestamp: new Date(),
      read: false,
      appointmentDetails: {
        patientName: user.additionalData.fullname,
        patientType: user.additionalData.patientType,
        doctorName: selectedDoctor.fullname,
        doctorImage:
          doctorData.image ||
          "https://firebasestorage.googleapis.com/v0/b/dental-aaup.appspot.com/o/default.jpg?alt=media&token=cf0548b6-f7cb-410d-bd1d-f17a83b541d7",
        clinicName: matchingClinic.ClinicName,
        day: format(selectedDay, "EEEE, MMMM do yyyy"),
        time: `${selectedTime.startTime} - ${selectedTime.endTime}`,
        userId: user.uid,
        doctorId: selectedDoctor.id,
      },
    };

    try {
      await updateDoc(doc(firestore, "Doctors", selectedDoctor.id), {
        notifications: arrayUnion(notification),
      });

      toast.success(
        `Booking request sent to ${selectedDoctor.fullname} for ${format(
          selectedDay,
          "EEEE, MMMM do yyyy"
        )} at ${selectedTime.startTime} - ${selectedTime.endTime}`,
        {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );

      setStep(1);
    } catch (error) {
      console.error("Error updating doctor's notifications: ", error);
    }
  };

  const handleBackClick = () => {
    if (step === 4) {
      setStep(2);
    } else {
      setStep(step - 1);
    }
  };

  return (
    <div>
      <div className="step-navigation">
        <ul className="step-indicator">
          <li className={step === 1 ? 'active' : ''}>1</li>
          <li className={step === 2 ? 'active' : ''}>2</li>
          <li className={step === 3 ? 'active' : ''}>3</li>
          <li className={step === 4 ? 'active' : ''}>4</li>
        </ul>
      </div>
      <div className="my-booking-container">
      {step === 1 && (
          <>
            <div>
              <h1
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {' '}
                <FaClinicMedical
                  style={{
                    fontSize: '40px',
                    color: '#317481',
                    marginRight: '10px',
                  }}
                />{' '}
                Available Clinic{' '}
              </h1>
              {matchingClinic ? (
                <div className="myclinic-card">
                  <div className="myclinic-title">
                    <h4>{matchingClinic.ClinicName}</h4>
                    <p> Location: {matchingClinic.Location}</p>
                  </div>

                  <img
                    src={matchingClinic.image}
                    alt={matchingClinic.ClinicName}
                    className="clinic-image"
                  />

                  <button
                    className="myclinic-button"
                    onClick={handleBookNowClick}
                  >
                    Book Now <FaArrowRight />
                  </button>
                </div>
              ) : (
                <p
                  style={{
                    color: '#848484',
                    fontFamily: 'tajwal',
                    fontSize: '20px',
                  }}
                >
                  There is no clinic available, you must book an initial
                  examination first.
                </p>
              )}
            </div>
          </>
        )}
        {/* {step === 1 && (
          <>
            <h3>Available Clinic:</h3>
            {matchingClinic ? (
              <div className="myclinic-card">
                <img
                  src={matchingClinic.image}
                  alt={matchingClinic.ClinicName}
                  className="clinic-image"
                />
                <div className="myclinic-title">
                  <h4>{matchingClinic.ClinicName}</h4>
                  <p>{matchingClinic.Location}</p>
                  <button
                    className="myclinic-button"
                    onClick={handleBookNowClick}
                  >
                    Book Now
                  </button>
                </div>
              </div>
            ) : (
              <p>
                There is no clinic available, you must book an initial
                examination first.
              </p>
            )}
          </>
        )} */}
        {step === 2 && (
          <div className="day-selection-container">
            <h4>Select Day</h4>
            <div className="day-options">
              {availableDays.map((day, index) => (
                <button
                  key={index}
                  className="day-button1"
                  onClick={() => handleDaySelection(day)}
                >
                  {format(day, "EEEE, MMMM do yyyy")}
                </button>
              ))}
            </div>
            {selectedDay && (
              <div className="time-doctor-selection-container">
                <div className="time-selection-container">
                  <h4>
                    Select Time for {format(selectedDay, "EEEE, MMMM do yyyy")}
                  </h4>
                  <div className="time-options">
                    {availableTimes.map((time, index) => (
                      <button
                        key={index}
                        className={`time-button1 ${
                          time.available ? "" : "booked"
                        }`}
                        onClick={() => handleTimeSelection(time, index)}
                        disabled={!time.available}
                      >
                        {time.startTime} - {time.endTime}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="doctor-cards">
                  <h4>Available Doctors</h4>
                  <div className="ContainerDoc">
                    {availableDoctors.map((doctor, index) => (
                      <div
                        id={`doctor-${doctor.id}`}
                        key={doctor.id}
                        className={`cards-doc ${
                          selectedDoctor === doctor ? "selected" : ""
                        }`}
                      >
                        <div className="card-image-container">
                          <img src={doctor.image} alt={doctor.fullname} />
                        </div>
                        <p className="title1">{doctor.fullname}</p>
                        <p className="specialization">
                          {doctor.Specialization}
                        </p>
                        {showSelectButton && selectedDoctor === doctor && (
                          <button
                            className="button1"
                            onClick={handleDoctorSelection}
                          >
                            Select Doctor
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            <button className="backk-button" onClick={handleBackClick}>
              Back
            </button>
          </div>
        )}
        {step === 4 && (
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
                  <strong>Education:</strong>
                  {selectedDoctor.Education}
                </p>
                <p>
                  <strong>Experience: </strong>
                  {selectedDoctor.Experience}
                </p>
              </div>
              <div className="booking-card">
                <p>
                  <strong>Doctor name:</strong>
                  {selectedDoctor.fullname}
                </p>
                <p>
                  <strong>Clinic:</strong> {matchingClinic.ClinicName}
                </p>
                <p>
                  <strong>Time:</strong>
                  {selectedTime.startTime} - {selectedTime.endTime}
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
        )}
      </div>
      <Footer />
      <ToastContainer />
    </div>
  );
};

export default MyBooking;