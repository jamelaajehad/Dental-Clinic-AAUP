import React, { useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore"; // Ensure getDoc is imported here
import { firestore } from "../../firebase";
import Footer from "../../components/Footer/footer";
import { useUser } from "../../contexts/UserContext";

const MyBooking = () => {
  const [matchingClinic, setMatchingClinic] = useState(null);
  const { user } = useUser();
  const [requiredTreatmentCondition, setRequiredTreatmentCondition] =
    useState("");

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        // Check if user is set correctly
        console.log("User:", user);

        if (!user || !user.uid) {
          console.error("User is not set correctly or does not have a uid");
          return;
        }

        // Fetch patient data to get required treatment condition
        const patientDocRef = doc(firestore, "Patients", user.uid);
        const patientDoc = await getDoc(patientDocRef);

        if (!patientDoc.exists()) {
          console.error("No patient found with the given uid");
          return;
        }

        const patientData = patientDoc.data();
        console.log("Patient Data:", patientData);
        setRequiredTreatmentCondition(patientData.requiredTreatmentCondition);

        // Fetch matching clinic based on required treatment condition
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
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (user && user.uid) {
      fetchPatientData();
    }
  }, [user]);

  return (
    <div>
      <h3>Matching Clinic</h3>
      {matchingClinic ? (
        <div>
          <h4>{matchingClinic.ClinicName}</h4>
          <p>{matchingClinic.Location}</p>
        </div>
      ) : (
        <p>No clinic found for the selected treatment condition.</p>
      )}
      <Footer />
    </div>
  );
};

export default MyBooking;
