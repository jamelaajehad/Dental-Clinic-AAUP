

// import './PatientInformation.css';
// import { useState } from 'react';
// import Footer from "../../components/Footer/footer";
// import { useNavigate } from 'react-router-dom';
// import { doc, setDoc, getDocs, collection } from "firebase/firestore";
// import { firestore } from '../../firebase'; // Ensure this path is correct

// const PatientInformation = () => {
//   const [patientName, setPatientName] = useState('');
//   const [patientId, setPatientId] = useState('');
//   const [fileNumber, setFileNumber] = useState('');
//   const [provisionalTreatmentPlan, setProvisionalTreatmentPlan] = useState('');
//   const [doctorSignature, setDoctorSignature] = useState('');
//   const [asaIV, setAsaIV] = useState({
//     Surgery: false,
//     Cons: false,
//     Ortho: false,
//     Peado: false,
//     Prostho: false,
//     Endo: false,
//     Perio: false,
//     Simple: false
//   });
//   const [asaV, setAsaV] = useState({
//     Surgery: false,
//     Cons: false,
//     Ortho: false,
//     Peado: false,
//     Prostho: false,
//     Endo: false,
//     Perio: false,
//     Complex: false
//   });
//   const [requiredTreatmentCondition, setRequiredTreatmentCondition] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);
//   const navigate = useNavigate();

//   const handleCheckboxChange = (year, field) => {
//     if (year === 'IV') {
//       setAsaIV({ ...asaIV, [field]: !asaIV[field] });
//     } else if (year === 'V') {
//       setAsaV({ ...asaV, [field]: !asaV[field] });
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setCurrentPage(2);
//   };

//   const handleSave = async () => {
//     try {
//       console.log('Saving form data...');

//       // Fetch all user documents from the Patients collection
//       const patientsCollectionRef = collection(firestore, "Patients");
//       const patientDocs = await getDocs(patientsCollectionRef);

//       let matchFound = false;

//       // Use for...of loop to iterate synchronously
//       for (const docSnapshot of patientDocs.docs) {
//         const userData = docSnapshot.data();
//         if (userData.idNumber === patientId) { // Compare the stored ID Number with entered patient ID
//           const userDocRef = doc(firestore, "Patients", docSnapshot.id);

//           await setDoc(userDocRef, {
//             patientName,
//             patientId,
//             provisionalTreatmentPlan,
//             fourthYear: asaIV,
//             fifthYear: asaV,
//             doctorSignature,
//             requiredTreatmentCondition // Include requiredTreatmentCondition in Firestore data
//           }, { merge: true });

//           matchFound = true;
//           alert('Form data saved successfully!');
//           break; // Exit the loop since match is found
//         }
//       }

//       if (!matchFound) {
//         alert('No user found with the entered Patient ID!');
//       }
//     } catch (error) {
//       console.error("Error saving form data: ", error);
//       alert('Error saving form data!');
//     }
//   };

//   const handleBack = () => {
//     if (currentPage === 2) {
//       setCurrentPage(1);
//     } else {
//       navigate(-1); // Navigate to the previous page
//     }
//   };

//   // Dropdown options for Required treatment condition
//   const treatmentConditions = [
//     "Pediatric dentistry",
//     "Preventive Treatments",
//     "Tooth extraction",
//     "Dental surgery",
//     "Dental implants",
//     "Dental fillings",
//     "Root canal treatments",
//     "Tooth restoration",
//     "Tooth replacement",
//     "Dental crowns and bridge",
//     "Dentures",
//     "Gum disease treatment",
//     "Gum surgery",
//     "Gum disease prevention",
//     "Orthodontic braces"
//   ];

//   return (
//     <div>
//       <div className="patient-information">
//         {currentPage === 1 && (
//           <div className="form-container">
//             <h3 className="form-title">Patient Information</h3>
//             <form onSubmit={handleSubmit} className="form">
//               <div className="form-group">
//                 <label className="form-label">Patient Name:</label>
//                 <input
//                   type="text"
//                   className="form-input"
//                   value={patientName}
//                   onChange={(e) => setPatientName(e.target.value)}
//                   required
//                 />
//               </div>
//               <div className="form-group">
//                 <label className="form-label">Patient ID:</label>
//                 <input
//                   type="text"
//                   className="form-input"
//                   value={patientId}
//                   onChange={(e) => setPatientId(e.target.value)}
//                   required
//                 />
//               </div>
//               <div className="form-group">
//                 <label className="form-label">Provisional Treatment Plan:</label>
//                 <textarea
//                   className="form-textarea"
//                   value={provisionalTreatmentPlan}
//                   onChange={(e) => setProvisionalTreatmentPlan(e.target.value)}
//                   placeholder="Enter provisional treatment plan..."
//                   required
//                 />
//               </div>
//               <button type="submit" className="form-button">Continue</button>
//             </form>
//           </div>
//         )}

//         {currentPage === 2 && (
//           <div className="home-sections">
//             <div className="asa-section1">
//               <h4 className="asa-title">ASA I (Fourth Year)</h4>
//               <div className="asa-list-horizontal">
//                 {Object.keys(asaIV).map(field => (
//                   <div key={field} className="checkbox-item">
//                     <input
//                       type="checkbox"
//                       checked={asaIV[field]}
//                       onChange={() => handleCheckboxChange('IV', field)}
//                     />
//                     <label>{field}</label>
//                   </div>
//                 ))}
//               </div>

//               <h4 className="asa-title2">ASA II (Fifth Year)</h4>
//               <div className="asa-list-horizontal">
//                 {Object.keys(asaV).map(field => (
//                   <div key={field} className="checkbox-item">
//                     <input
//                       type="checkbox"
//                       checked={asaV[field]}
//                       onChange={() => handleCheckboxChange('V', field)}
//                     />
//                     <label>{field}</label>
//                   </div>
//                 ))}
//               </div>

//               <div className="required-treatment">
//                 <label className="form-label">Required Treatment Condition:</label>
//                 <select
//                   value={requiredTreatmentCondition}
//                   onChange={(e) => setRequiredTreatmentCondition(e.target.value)}
//                   className="form-input"
//                   required
//                 >
//                   <option value="">Select treatment condition</option>
//                   {treatmentConditions.map(condition => (
//                     <option key={condition} value={condition}>{condition}</option>
//                   ))}
//                 </select>
//               </div>
//             </div>
//             <div className="signature-box">
//               <label className="signature-label">Doctor Signature:</label>
//               <input
//                 type="text"
//                 className="signature-input"
//                 value={doctorSignature}
//                 onChange={(e) => setDoctorSignature(e.target.value)}
//                 placeholder="Enter your signature here"
//                 required
//               />
//             </div>
//             <div>
//               <button type="button" className="back-button" onClick={handleBack}>Back</button>
//               <button onClick={handleSave} className="save-button">Save</button>
//             </div>
//           </div>
//         )}
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default PatientInformation;
import './PatientInformation.css';
import { useState } from 'react';
import Footer from "../../components/Footer/footer";
import { useNavigate } from 'react-router-dom';
import { doc, setDoc, getDocs, collection, query, where } from "firebase/firestore";
import { firestore } from '../../firebase'; // Ensure this path is correct

const PatientInformation = () => {
  const [patientName, setPatientName] = useState('');
  const [patientId, setPatientId] = useState('');
  const [fileNumber, setFileNumber] = useState('');
  const [provisionalTreatmentPlan, setProvisionalTreatmentPlan] = useState('');
  const [doctorSignature, setDoctorSignature] = useState('');
  const [asaIV, setAsaIV] = useState({
    Surgery: false,
    Cons: false,
    Ortho: false,
    Peado: false,
    Prostho: false,
    Endo: false,
    Perio: false,
    Simple: false
  });
  const [asaV, setAsaV] = useState({
    Surgery: false,
    Cons: false,
    Ortho: false,
    Peado: false,
    Prostho: false,
    Endo: false,
    Perio: false,
    Complex: false
  });
  const [requiredTreatmentCondition, setRequiredTreatmentCondition] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  const handleCheckboxChange = (year, field) => {
    if (year === 'IV') {
      setAsaIV({ ...asaIV, [field]: !asaIV[field] });
    } else if (year === 'V') {
      setAsaV({ ...asaV, [field]: !asaV[field] });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setCurrentPage(2);
  };

  const handleSave = async () => {
    try {
      console.log('Saving form data...');

      // Fetch all user documents from the Patients collection
      const patientsCollectionRef = collection(firestore, "Patients");
      const patientDocs = await getDocs(patientsCollectionRef);

      let matchFound = false;

      // Use for...of loop to iterate synchronously
      for (const docSnapshot of patientDocs.docs) {
        const userData = docSnapshot.data();
        if (userData.idNumber === patientId) { // Compare the stored ID Number with entered patient ID
          const userDocRef = doc(firestore, "Patients", docSnapshot.id);

          await setDoc(userDocRef, {
            provisionalTreatmentPlan,
            fourthYear: asaIV,
            fifthYear: asaV,
            doctorSignature,
            requiredTreatmentCondition // Include requiredTreatmentCondition in Firestore data
          }, { merge: true });

          matchFound = true;
          alert('Form data saved successfully!');
          // Redirect to MyBooking page with patientId
          break; // Exit the loop since match is found
        }
      }

      if (!matchFound) {
        alert('No user found with the entered Patient ID!');
      }
    } catch (error) {
      console.error("Error saving form data: ", error);
      alert('Error saving form data!');
    }
  };

  const handleBack = () => {
    if (currentPage === 2) {
      setCurrentPage(1);
    } else {
      navigate(-1); // Navigate to the previous page
    }
  };

  // Dropdown options for Required treatment condition
  const treatmentConditions = [
    "Pediatric dentistry",
    "Preventive Treatments",
    "Tooth extractions",
    "Dental surgery",
    "Dental implants",
    "Dental fillings",
    "Root canal treatments",
    "Tooth restoration",
    "Tooth replacement",
    "Dental crowns and bridge",
    "Dentures",
    "Gum disease treatment",
    "Gum surgery",
    "Gum disease prevention",
    "Orthodontic braces"
  ];

  return (
    <div>
      <div className="patient-information">
        {currentPage === 1 && (
          <div className="form-container">
            <h3 className="form-title">Patient Information</h3>
            <form onSubmit={handleSubmit} className="form">
              <div className="form-group">
                <label className="form-label">Patient Name:</label>
                <input
                  type="text"
                  className="form-input"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Patient ID:</label>
                <input
                  type="text"
                  className="form-input"
                  value={patientId}
                  onChange={(e) => setPatientId(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Provisional Treatment Plan:</label>
                <textarea
                  className="form-textarea"
                  value={provisionalTreatmentPlan}
                  onChange={(e) => setProvisionalTreatmentPlan(e.target.value)}
                  placeholder="Enter provisional treatment plan..."
                  required
                />
              </div>
              <button type="submit" className="form-button">Continue</button>
            </form>
          </div>
        )}

        {currentPage === 2 && (
          <div className="home-sections">
            <div className="asa-section1">
              <h4 className="asa-title">ASA I (Fourth Year)</h4>
              <div className="asa-list-horizontal">
                {Object.keys(asaIV).map(field => (
                  <div key={field} className="checkbox-item">
                    <input
                      type="checkbox"
                      checked={asaIV[field]}
                      onChange={() => handleCheckboxChange('IV', field)}
                    />
                    <label>{field}</label>
                  </div>
                ))}
              </div>

              <h4 className="asa-title2">ASA II (Fifth Year)</h4>
              <div className="asa-list-horizontal">
                {Object.keys(asaV).map(field => (
                  <div key={field} className="checkbox-item">
                    <input
                      type="checkbox"
                      checked={asaV[field]}
                      onChange={() => handleCheckboxChange('V', field)}
                    />
                    <label>{field}</label>
                  </div>
                ))}
              </div>

              <div className="required-treatment">
                <label className="form-label">Required Treatment Condition:</label>
                <select
                  value={requiredTreatmentCondition}
                  onChange={(e) => setRequiredTreatmentCondition(e.target.value)}
                  className="form-input"
                  required
                >
                  <option value="">Select treatment condition</option>
                  {treatmentConditions.map(condition => (
                    <option key={condition} value={condition}>{condition}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="signature-box">
              <label className="signature-label">Doctor Signature:</label>
              <input
                type="text"
                className="signature-input"
                value={doctorSignature}
                onChange={(e) => setDoctorSignature(e.target.value)}
                placeholder="Enter your signature here"
                required
              />
            </div>
            <div>
              <button type="button" className="back-button" onClick={handleBack}>Back</button>
              <button onClick={handleSave} className="save-button">Save</button>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default PatientInformation;



