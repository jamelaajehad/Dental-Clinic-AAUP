import React, { createContext, useContext, useState, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
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
        const doctorDoc = await getDoc(
          doc(firestore, "Doctors", currentUser.uid)
        );

        if (doctorDoc.exists()) {
          const userData = { ...currentUser, ...doctorDoc.data() };
          setUser(userData);
          localStorage.setItem("user", JSON.stringify(userData));
        } else {
          const patientDoc = await getDoc(
            doc(firestore, "Patients", currentUser.uid)
          );

          if (patientDoc.exists()) {
            const userData = { ...currentUser, ...patientDoc.data() };
            setUser(userData);
            localStorage.setItem("user", JSON.stringify(userData));
          } else {
            setUser(null);
            localStorage.removeItem("user");
          }
        }
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
