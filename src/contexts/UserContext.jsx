import React, { createContext, useContext, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, firestore } from "../firebase";

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        let storedUser = {
          uid: currentUser.uid,
          email: currentUser.email,
        };

        const doctorDoc = await getDoc(
          doc(firestore, "Doctors", currentUser.uid)
        );
        if (doctorDoc.exists()) {
          storedUser.userType = "doctor";
          storedUser.additionalData = doctorDoc.data();
          storedUser.isPrimaryExaminationDoctor =
            doctorDoc.data().isPrimaryExaminationDoctor || false;
        } else {
          const patientDoc = await getDoc(
            doc(firestore, "Patients", currentUser.uid)
          );
          if (patientDoc.exists()) {
            storedUser.userType = "patient";
            storedUser.additionalData = patientDoc.data();
          } else {
            const managerDoc = await getDoc(
              doc(firestore, "Maneger", currentUser.uid)
            );
            if (managerDoc.exists()) {
              storedUser.userType = "admin";
              storedUser.additionalData = managerDoc.data();
            }
          }
        }

        setUser(storedUser);
        localStorage.setItem("user", JSON.stringify(storedUser));
      } else {
        setUser(null);
        localStorage.removeItem("user");
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
