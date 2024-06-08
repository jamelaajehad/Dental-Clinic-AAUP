import React from "react";
import Navbar from "./components/Navbar/navbar";
import Home from "./pages/home/home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm1 from "./pages/Login/Login";
import Doctor from "./pages/doctors/doctor";
import ForgotPassword from "./pages/ForgetPassword/forget-comp";
import Contact from "./pages/Contact/contact";
import DoctorDetails from "./pages/Doctordeatails/ClinicsDetails";
import Services from "./pages/Services/Services";
import Register from "./pages/Register/register";
import Booking from "./pages/Booking/booking";
import UserProfile from "./pages/UserProfile/userprofile";
import AdminPage from "./pages/AdminPage/AdminPage";
import DoctorDashboard from "./pages/DoctorDashboard/DoctorDashboard";
import Clinics from "./pages/Clinic/clinics";
import { UserProvider } from "./contexts/UserContext";
import Initial from "./pages/InitialExamination/initialexamination";


const App = () => {
  return (
    <UserProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/LoginForm" element={<LoginForm1 />} />
          <Route path="/register" element={<Register />} />
          <Route path="/doctor" element={<Doctor />} />
          <Route path="/doctors/:doctorIndex" element={<DoctorDetails />} />
          <Route path="/forget-comp" element={<ForgotPassword />} />
          <Route path="/clinics" element={<Clinics />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/initialexamination " element={<Initial />} />
          <Route path="/user" element={<UserProfile />} />
          <Route path="/admin/:activepage" element={<AdminPage />} />
          <Route path="/DoctorDashboard" element={<DoctorDashboard />} />
        </Routes>
      </Router>
    </UserProvider>
  );
};
export default App;
