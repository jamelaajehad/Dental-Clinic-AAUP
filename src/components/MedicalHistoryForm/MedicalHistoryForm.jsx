import React from 'react';
import './MedicalHistoryForm.css';
import medical from "../../Asset/app-images/medical.png";

const MedicalHistoryForm = ({ medicalHistory, setMedicalHistory, handleMedicalHistorySubmit, handleBackButton }) => {
  return (
    <div  >
    <div className='title-cont'> 
    <h4> Help Us Provide Better Care: Complete Your Medical History </h4>
    </div>
     <div  className= "medical-history-form "> 
      <div className="medical-history">
        <h4>  <img
       src={medical}
       alt="medical"
       style={{ width: "30px", height: "30px" }}
       className="medical-picture"
         /> Medical History:</h4>
        <p> Have there been any changes in your health in the past year?</p>
        <div className="radio-options">
          <input
            type="radio"
            id="changesInHealthYes"
            name="changesInHealth"
            value="Yes"
            onChange={(e) => setMedicalHistory({ ...medicalHistory, changesInHealth: e.target.value })}
          />
          <label htmlFor="changesInHealthYes">Yes</label>
          <input
            type="radio"
            id="changesInHealthNo"
            name="changesInHealth"
            value="No"
            onChange={(e) => setMedicalHistory({ ...medicalHistory, changesInHealth: e.target.value })}
          />
          <label htmlFor="changesInHealthNo">No</label>
        </div>

       
        <p>  Are you under the care of a physician?</p>
        <div className="radio-options">
          <input
            type="radio"
            id="underPhysicianCareYes"
            name="underPhysicianCare"
            value="Yes"
            onChange={(e) => setMedicalHistory({ ...medicalHistory, underPhysicianCare: e.target.value })}
          />
          <label htmlFor="underPhysicianCareYes">Yes</label>
          <input
            type="radio"
            id="underPhysicianCareNo"
            name="underPhysicianCare"
            value="No"
            onChange={(e) => setMedicalHistory({ ...medicalHistory, underPhysicianCare: e.target.value })}
          />
          <label htmlFor="underPhysicianCareNo">No</label>
        </div>

        <p> Have you had any serious illnesses or operations?</p>
        <div className="radio-options">
          <input
            type="radio"
            id="seriousIllnessesYes"
            name="seriousIllnesses"
            value="Yes"
            onChange={(e) => setMedicalHistory({ ...medicalHistory, seriousIllnesses: e.target.value })}
          />
          <label htmlFor="seriousIllnessesYes">Yes</label>
          <input
            type="radio"
            id="seriousIllnessesNo"
            name="seriousIllnesses"
            value="No"
            onChange={(e) => setMedicalHistory({ ...medicalHistory, seriousIllnesses: e.target.value })}
          />
          <label htmlFor="seriousIllnessesNo">No</label>
        </div>

        <p>  Females: Are you pregnant?</p>
        <div className="radio-options">
          <input
            type="radio"
            id="pregnantYes"
            name="pregnant"
            value="Yes"
            onChange={(e) => setMedicalHistory({ ...medicalHistory, pregnant: e.target.value })}
          />
          <label htmlFor="pregnantYes">Yes</label>
          <input
            type="radio"
            id="pregnantNo"
            name="pregnant"
            value="No"
            onChange={(e) => setMedicalHistory({ ...medicalHistory, pregnant: e.target.value })}
          />
          <label htmlFor="pregnantNo">No</label>
        </div>
     
      <p>Please check if you have (or have had) any of the following problems:</p>
          <div className="medical-history2">
            <p>Heart Disease:</p>
            <div className="checkbox-options">
              <input type="checkbox" id="heartDiseaseHeartFailure" name="heartDisease" value="Heart Failure" onChange={(e) => setMedicalHistory({ ...medicalHistory, heartDisease: e.target.value })} />
              <label htmlFor="heartDiseaseHeartFailure">Heart Failure</label>
              <input type="checkbox" id="heartDiseaseHeartAttack" name="heartDisease" value="Heart Attack" onChange={(e=> setMedicalHistory({ ...medicalHistory, heartDisease: e.target.value }))} />

           <label htmlFor="heartDiseaseHeartAttack">Heart Attack</label>
           <input type="checkbox" id="heartDiseaseAngina" name="heartDisease" value="Angina" onChange={(e) => setMedicalHistory({ ...medicalHistory, heartDisease: e.target.value })} />
           <label htmlFor="heartDiseaseAngina">Angina</label>
           <input type="checkbox" id="heartDiseasePacemaker" name="heartDisease" value="Pacemaker" onChange={(e) => setMedicalHistory({ ...medicalHistory, heartDisease: e.target.value })} />
          <label htmlFor="heartDiseasePacemaker">Pacemaker</label>
          <input type="checkbox" id="heartDiseaseCongenital" name="heartDisease" value="Congenital Heart Disease" onChange={(e) => setMedicalHistory({ ...medicalHistory, heartDisease: e.target.value })} />
         <label htmlFor="heartDiseaseCongenital">Congenital Heart Disease</label>
          <input type="text" id="heartDiseaseOther" name="heartDisease" placeholder="Other" onChange={(e) => setMedicalHistory({ ...medicalHistory, heartDisease: e.target.value })} />
         </div>


          <p>Blood Disease:</p>
         <div className="checkbox-options">
         <input type="checkbox" id="bloodDiseaseAnemia" name="bloodDisease" value="Anemia" onChange={(e) => setMedicalHistory({ ...medicalHistory, bloodDisease: e.target.value })} />
          <label htmlFor="bloodDiseaseAnemia">Anemia</label>
         <input type="checkbox" id="bloodDiseaseHemophilia" name="bloodDisease" value="Hemophilia" onChange={(e) => setMedicalHistory({ ...medicalHistory, bloodDisease: e.target.value })} />
        <label htmlFor="bloodDiseaseHemophilia">Hemophilia</label>
         <input type="checkbox" id="bloodDiseaseLeukemia" name="bloodDisease" value="Leukemia" onChange={(e) => setMedicalHistory({ ...medicalHistory, bloodDisease: e.target.value })} />
         <label htmlFor="bloodDiseaseLeukemia">Leukemia</label>
        <input type="checkbox" id="bloodDiseaseTransfusion" name="bloodDisease" value="Blood Transfusion" onChange={(e) => setMedicalHistory({ ...medicalHistory, bloodDisease: e.target.value })} />
        <label htmlFor="bloodDiseaseTransfusion">Blood Transfusion</label>
         <input type="text" id="bloodDiseaseOther" name="bloodDisease" placeholder="Other" onChange={(e) => setMedicalHistory({ ...medicalHistory, bloodDisease: e.target.value })} />
        </div>
       </div>
        <div className='Buttons-Container'> 
       <button className="back-button" onClick={handleBackButton}>Back</button>
      <button className="next-button" onClick={handleMedicalHistorySubmit}>Next</button>
       </div>
       </div>
       </div>
      </div>
  );
};

export default MedicalHistoryForm;