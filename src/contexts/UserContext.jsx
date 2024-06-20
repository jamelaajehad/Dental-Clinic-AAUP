/*import React, { createContext, useContext, useState, useEffect } from "react";
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
           const userData = { ...currentUser, ...doctorDoc.data(), userType: "doctor" };
           setUser(userData);
          localStorage.setItem("user", JSON.stringify(userData));
         } else {
           const patientDoc = await getDoc(
            doc(firestore, "Patients", currentUser.uid)
          );

          if (patientDoc.exists()) {
           const userData = { ...currentUser, ...patientDoc.data(),userType: "patient"  };
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
};*/


import React, { createContext, useContext, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, firestore } from "../firebase";

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const storedUser = {
          uid: currentUser.uid,
          email: currentUser.email,
        };

        const doctorDoc = await getDoc(doc(firestore, "Doctors", currentUser.uid));
        if (doctorDoc.exists()) {
          storedUser.userType = "doctor";
          storedUser.additionalData = doctorDoc.data();
        } else {
          const patientDoc = await getDoc(doc(firestore, "Patients", currentUser.uid));
          if (patientDoc.exists()) {
            storedUser.userType = "patient";
            storedUser.additionalData = patientDoc.data();
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
