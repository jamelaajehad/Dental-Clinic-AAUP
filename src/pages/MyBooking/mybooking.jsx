import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { collection, query, where, getDocs } from "firebase/firestore";
import { firestore } from '../../firebase'; // تأكد من صحة هذا المسار
import Footer from "../../components/Footer/footer";

const MyBooking = () => {
  const location = useLocation();
  const { patientId } = location.state || {};
  const [matchingClinics, setMatchingClinics] = useState([]);
  const [requiredTreatmentCondition, setRequiredTreatmentCondition] = useState('');

  useEffect(() => {
    const fetchPatientData = async () => {
      if (!patientId) return;

      // Fetch patient data to get required treatment condition
      const patientsCollectionRef = collection(firestore, "Patients");
      const patientDocs = await getDocs(query(patientsCollectionRef, where("patientId", "==", patientId)));

      if (!patientDocs.empty) {
        const patientData = patientDocs.docs[0].data();
        setRequiredTreatmentCondition(patientData.requiredTreatmentCondition);

        // Fetch matching clinics based on required treatment condition
        const clinicsCollectionRef = collection(firestore, "Clinics");
        const clinicsQuery = query(clinicsCollectionRef, where("RequiredTreatment", "==", patientData.requiredTreatmentCondition));
        const clinicDocs = await getDocs(clinicsQuery);

        const clinics = clinicDocs.docs.map(doc => doc.data());
        setMatchingClinics(clinics);
      }
    };

    fetchPatientData();
  }, [patientId]);

  return (
    <div>
      <h3>Matching Clinics</h3>
      {matchingClinics.length > 0 ? (
        <ul>
          {matchingClinics.map((clinic, index) => (
            <li key={index}>
              <h4>{clinic.clinicName}</h4>
              <p>{clinic.location}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No clinics found for the selected treatment condition.</p>
      )}
      <Footer />
    </div>
  );
};

export default MyBooking;
