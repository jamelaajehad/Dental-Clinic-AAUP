// import React from 'react';

// const MyBookings = () => {
 
//   return (
//     <div>
//       <h3>My Bookings</h3>
//       <ul>
//         <li>Booking 1: Date, Time</li>
//         <li>Booking 2: Date, Time</li>
//         <li>Booking 3: Date, Time</li>
//       </ul>
//     </div>
//   );
// };

// export default MyBookings;

import React, { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore, auth } from "../../firebase"; // Ensure you have imported auth from firebase
import "./Mybooking.css";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const userId = auth.currentUser.uid;
        const q = query(collection(firestore, "Appointments"), where("userId", "==", userId));
        const querySnapshot = await getDocs(q);

        const userBookings = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        setBookings(userBookings);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div className="my-bookings-container">
      <h3>My Bookings</h3>
      <div className="bookings-list">
        {bookings.length > 0 ? (
          bookings.map((booking) => (
            <div key={booking.id} className="booking-card1">
              <p><strong>Date:</strong> {booking.day}</p>
              <p><strong>Time:</strong> {booking.time}</p>
            </div>
          ))
        ) : (
          <p>No bookings found.</p>
        )}
      </div>
    </div>
  );
};

export default MyBookings;
