import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "./DoctorCarousel.css";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { FaCommentDots } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // for navigation
import AOS from "aos";
import "aos/dist/aos.css";

import doctor1 from "../../Asset/doctor-images/doctor1.jpg";
import doctor2 from "../../Asset/doctor-images/doctor2.jpg";
import doctor3 from "../../Asset/doctor-images/doctor3.jpg";
import doctor4 from "../../Asset/doctor-images/doctor4.jpg";
import doctor5 from "../../Asset/doctor-images/doctor5.jpg";
import doctor6 from "../../Asset/doctor-images/doctor6.jpg";
import doctor7 from "../../Asset/doctor-images/doctor7.jpg";
import doctor8 from "../../Asset/doctor-images/doctor8.jpg";
import doctor10 from "../../Asset/doctor-images/doctor10.jpg";
import doctor11 from "../../Asset/doctor-images/doctor11.jpg";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
  addDoc,
} from "firebase/firestore";
import { firestore, auth } from "../../firebase";

const doctorsData = [
  { name: "Dr. Rana Ali", description: "Orthodontist", image: doctor1 },
  { name: "Dr. Mohammed Samer", description: "Periodontist", image: doctor2 },
  { name: "Dr. Ahmad Taleb", description: "Oral Surgeon", image: doctor3 },
  { name: "Dr. Rema Saleh", description: "Prosthodontist", image: doctor4 },
  { name: "Dr. Sami Iyad", description: "Pediatric Dentist", image: doctor5 },
  { name: "Dr. Lana Murad", description: "Oral Surgeon", image: doctor6 },
  { name: "Dr. Dana Salah", description: "Orthodontist", image: doctor7 },
  { name: "Dr. Rami Ayman", description: "Periodontist", image: doctor8 },
  { name: "Dr. Omar Maher", description: "Pediatric Dentist", image: doctor10 },
  { name: "Dr. Dana Salah", description: "Periodontist", image: doctor11 },
];

const DoctorCarousel = () => {
  const [doctorsDataa, setDoctorsDataa] = useState([]);
  useEffect(() => {
    const fetchDoctorsData = async () => {
      try {
        const doctorsCollection = collection(firestore, "Doctors");
        const doctorSnapshot = await getDocs(doctorsCollection);
        const doctorsList = doctorSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setDoctorsDataa(doctorsList);
      } catch (error) {
        console.error("Error fetching doctors data:", error);
      }
    };

    fetchDoctorsData();
  }, []);

  const navigate = useNavigate(); // Use for navigation

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const startChat = async (doctorId, doctorName) => {
    console.log("hi docootor");
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

  return (
    <div className="doctors-carousel">
      <h2 data-aos="fade-up">Meet Our Specialist Team</h2>
      <p className="SecTitle" data-aos="fade-up">
        Our team of experts is dedicated to providing exceptional dental care
        for your perfect smile.
      </p>
      <Swiper
        pagination={{
          dynamicBullets: true,
        }}
        modules={[Pagination]}
        slidesPerView={3}
      >
        {doctorsDataa.map((doctor, index) => (
          <SwiperSlide key={index}>
            <div className="Cards-Doct">
              <div className="Cards-doctor-image">
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  style={{ width: "95%", height: "300px", objectFit: "cover" }}
                />
              </div>
              <div className="doctor-info">
                <div>
                  <p className="card-title">{doctor.fullname}</p>
                  <p className="des3">{doctor.Specialization}</p>
                </div>
                <div
                  className="chat-icon"
                  onClick={() => {
                    startChat(doctor.id, doctor.fullname);
                  }}
                >
                  <FaCommentDots size="1.7em" />
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default DoctorCarousel;
