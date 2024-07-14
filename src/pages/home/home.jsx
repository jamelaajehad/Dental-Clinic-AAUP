import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Aos from "aos";
import "aos/dist/aos.css";
import "./home.css";
import img2 from "../../Asset/app-images/img2.jpg";
import home from "../../Asset/app-images/home.png";
import treatment from "../../Asset/app-images/treatment.png";
import staff from "../../Asset/app-images/staff.png";
import Footer from "../../components/Footer/footer";
import Whitening from "../../Asset/app-images/TeethWhitening.png";
import Orthodontics from "../../Asset/app-images/Orthodontics.png";
import implants from "../../Asset/app-images/implants.png";
import tooth from "../../Asset/app-images/tooth.png";
import filling from "../../Asset/app-images/filling.png";
import extraction from "../../Asset/app-images/extraction.png";
import { firestore } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import { useUser } from "../../contexts/UserContext";
import DoctorCarousel from "../../components/DoctorCarousel/DoctorCarousel";
import InteractiveMap from "../../components/InteractiveMap/InteractiveMap"; // Import the interactive map component

const Home = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const [hasBooked, setHasBooked] = useState(false);
  const [isDoctor, setIsDoctor] = useState(false);

  useEffect(() => {
    const checkUserType = async () => {
      if (user) {
        if (user.userType === "doctor" || user.isPrimaryExaminationDoctor) {
          setIsDoctor(true);
          console.log("User is a doctor or a primary examination doctor."); // Debug log
        } else if (user.userType === "patient") {
          console.log("Checking booking status for user:", user.uid); // Debug log
          try {
            const docRef = doc(firestore, "Patients", user.uid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
              const data = docSnap.data();
              console.log("Firestore data:", data); // Debug log
              if (data.patientType) {
                setHasBooked(true);
                console.log("User has booked the initial examination."); // Debug log
              } else {
                setHasBooked(false);
                console.log("User has not booked the initial examination."); // Debug log
              }
            }
          } catch (error) {
            console.error("Error checking booking status:", error);
          }
        }
      }
    };
    checkUserType();
  }, [user]);

  useEffect(() => {
    Aos.init();
  }, []);

  const renderCards = (
    cardData,
    cardClass,
    iconClass,
    contentClass,
    textClass
  ) => {
    return cardData.map((card, index) => (
      <div
        data-aos="fade-down"
        data-aos-duration="1500"
        key={index}
        className={cardClass}
      >
        <img src={card.icon} alt={card.title} className={iconClass} />
        <div className={contentClass}>
          <h4>{card.title}</h4>
          <p className={textClass}>{card.description}</p>
        </div>
      </div>
    ));
  };

  const thirdContainerCards = [
    {
      title: "Comfortable Environment",
      description: "Ensuring a relaxing and pleasant experience,",
      icon: home,
    },
    {
      title: "Highest Quality Treatment",
      description: "Utilizing the latest technology for your dental care.",
      icon: treatment,
    },
    {
      title: "Experienced Staff",
      description: "Highly skilled professionals ready to care for you.",
      icon: staff,
    },
  ];

  const fourthContainerCards = [
    {
      title: "Teeth Whitening",
      description:
        "Our clinic offers professional teeth whitening services designed to brighten your smile by effectively removing stains and discoloration.",
      icon: Whitening,
    },
    {
      title: "Orthodontics",
      description:
        "Straighten your teeth with advanced care, including traditional braces and clear aligners, to achieve a healthier, more beautiful smile.",
      icon: Orthodontics,
    },
    {
      title: "Dental Implants",
      description:
        "Restore your smile with durable dental implants, offering a permanent solution for missing teeth. Enjoy natural-looking results.",
      icon: implants,
    },
    {
      title: "Pediatric Dentistry",
      description:
        "Specialized care for children, ensuring their dental health with gentle treatments and preventive services tailored to their needs.",
      icon: tooth,
    },
    {
      title: "Fillings Treatment",
      description:
        "We restore decayed teeth with composite resins, amalgam, or other materials to preserve tooth structure and promote lasting dental health.",
      icon: filling,
    },
    {
      title: "Tooth Extractions",
      description:
        "Expert surgical care for the precise removal of problematic teeth, ensuring patient comfort and optimal outcomes.",
      icon: extraction,
    },
  ];

  return (
    <div className="content">
      <div className="home-container">
        <section className="home">
          <div className="title">
            <h1 align="left ">Welcome to the arab</h1>
            <h1 align="left ">American university Clinics</h1>
            {user ? (
              user.userType === "patient" && !hasBooked && !isDoctor ? (
                <button
                  onClick={() => navigate("initialexamination")}
                  className="btn"
                >
                  Book Initial Examination
                </button>
              ) : null
            ) : (
              <button onClick={() => navigate("LoginForm")} className="btn">
                Log In
              </button>
            )}
          </div>
        </section>
      </div>
      <div className="sec-container">
        <div data-aos="fade-up" data-aos-duration="2000" className="About">
          <p className="mainAb">About us</p>
          <p className="about">Dental Clinic AAUP</p>
          <p className="us">
            Welcome to our university dental clinic website! We're here to offer
            accessible, convenient dental care. With our user-friendly platform,
            scheduling appointments is easy. Whether it's a check-up or
            specialized treatment, our experienced team provides personalized
            care for a healthier smile!
          </p>
        </div>
        <div data-aos="zoom-in-left" data-aos-duration="1500" className="img">
          <img
            src={img2}
            alt="#"
            style={{ width: "390px%", height: "390px" }}
          />
        </div>
      </div>
      <div className="third-container">
        <h2 align="center" className="one">
          Redefining your dental experience!
        </h2>
        <p className="description" align="center">
          Experience the difference at our clinic, where the highest quality
          treatment is delivered by experienced staff in a relaxing environment.
        </p>
        <div className="cards-container">
          {renderCards(thirdContainerCards, "cardSec", "card-icon", "cardp")}
        </div>
      </div>
      <div className="fourth-container">
        <h2 align="center">A wide range of services</h2>
        <p align="center">
          <span>
            Arab American University clinics provide several services:
          </span>
        </p>
        <div className="cards-container2">
          {renderCards(
            fourthContainerCards,
            "cardSecFourth",
            "card-icon-fourth",
            "card-content-fourth",
            "cardpFourth"
          )}
        </div>
      </div>
      <div className="fifth-container">
        <DoctorCarousel />
      </div>
      <div
        className="map-container"
        data-aos="fade-up"
        data-aos-duration="2000"
      >
        <InteractiveMap />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
