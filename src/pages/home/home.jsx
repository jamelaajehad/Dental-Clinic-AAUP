import React from "react";
import { useEffect, useRef } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import "./home.css";

// import {firestore} from "../../firebase" ;
import { addDoc, collection } from "@firebase/firestore";

import { useNavigate } from "react-router-dom";
import img2 from "../../Asset/app-images/img2.jpg";
import home from "../../Asset/app-images/home.png";
import treatment from "../../Asset/app-images/treatment.png";
import staff from "../../Asset/app-images/staff.png";
import Footer from "../../components/Footer/footer";

const Home = () => {
  /*const messageRef= useRef();
  const ref = collection(firestore, "message");
  const handleSave = async(e) => {
    e.preventDefault();
    console.log(messageRef.current.value);
    let data ={
      message: messageRef.current.value,
    };
    try{
  addDoc(ref,data);
    }
    catch(e){
      console.log(e);
    }
  };*/

  const navigate = useNavigate();
  useEffect(() => {
    Aos.init();
  }, []);
  const renderCards = () => {
    const cardData = [
      {
        title: "Comfortable Environment",
        description: "Ensuring a relaxing and pleasant experience, ",
        icon: home,
      },
      {
        title: "Highest Quality Treatment ",
        description: "Utilizing the latest technology for your dental care.",
        icon: treatment,
      },
      {
        title: "Experienced Staff",
        description: "Highly skilled professionals ready to care for you.",
        icon: staff,
      },
    ];

    return cardData.map((card, index) => (
      <div
        data-aos="fade-down"
        data-aos-duration="1500"
        key={index}
        className="cardSec"
      >
        <img src={card.icon} alt={card.title} className="card-icon" />
        <h4>{card.title}</h4>
        <p className="cardp">{card.description}</p>
      </div>
    ));
  };
  return (
    <div className="content">
      <div className="home-container">
        <section className="home">
          <div className="title">
            <h1 align="left ">Welcome to the arab</h1>
            <h1 align="left ">American university Clinics</h1>
            <button onClick={() => navigate("LoginForm")} className="btn">
              Log In
            </button>
          </div>
        </section>
      </div>
      <div className="sec-container">
        <div data-aos="fade-up" data-aos-duration="2000" className="About">
          <p className="mainAb"> About us </p>
          <p className="about">Dental Clinic AAUP </p>
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
          Redefinig your dental experience!
        </h2>
        <p className="description" align="center">
          Experience the difference at our clinic, where the highest quality
          treatment is delivered by experienced staff in a relaxing environment.
        </p>
        <div className="cards-container">{renderCards()}</div>
      </div>
      <div className="fourth-container">
        <h2 align="center"> Services</h2>
        <p align="center">
          <span>
            Arab American University clinics provide several services:
          </span>
        </p>
        <div data-aos="zoom-in" data-aos-duration="2000" className="cards">
          <div className="card red">
            <p className="tip">Radiography </p>
          </div>
          <div className="card blue">
            <p className="tip">Teeth Cleaning and Prevention</p>
          </div>
          <div className="card green">
            <p className="tip">Fillings and Caries Treatment</p>
          </div>
        </div>
        <div data-aos="zoom-in" data-aos-duration="2000" className="cards2">
          <div className="card red1">
            <p className="tip1">Orthodontic Services </p>
          </div>
          <div className="card blue1">
            <p className="tip1">Oral Surgery </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
