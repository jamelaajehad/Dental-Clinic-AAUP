import React from 'react';
import './DentalHistoryForm.css';
import dental from "../../Asset/app-images/dental.png";


const DentalHistoryForm = ({ dentalHistory, setDentalHistory, handleDentalHistorySubmit, handleBackButton }) => {
  return (
    <div className="step-container1">
      <div className="dental-history">
        <h4><img
       src={dental}
       alt="dental"
       style={{ width: "34px", height: "34px" }}
       className="dental-picture"
         /> Dental History:</h4>
        <p>Have you had any serious problems with any previous dental treatment?</p>
        <div className="radio-options">
          <input
            type="radio"
            id="previousDentalTreatmentYes"
            name="previousDentalTreatment"
            value="Yes"
            onChange={(e) => setDentalHistory({ ...dentalHistory, previousDentalTreatment: e.target.value })}
          />
          <label htmlFor="previousDentalTreatmentYes">Yes</label>
          <input
            type="radio"
            id="previousDentalTreatmentNo"
            name="previousDentalTreatment"
            value="No"
            onChange={(e) => setDentalHistory({ ...dentalHistory, previousDentalTreatment: e.target.value })}
          />
          <label htmlFor="previousDentalTreatmentNo">No</label>
        </div>

        <p>Have you ever had an injury to your face, jaw, or teeth?</p>
        <div className="radio-options">
          <input
            type="radio"
            id="injuryToFaceYes"
            name="injuryToFace"
            value="Yes"
            onChange={(e) => setDentalHistory({ ...dentalHistory, injuryToFace: e.target.value })}
          />
          <label htmlFor="injuryToFaceYes">Yes</label>
          <input
            type="radio"
            id="injuryToFaceNo"
            name="injuryToFace"
            value="No"
            onChange={(e) => setDentalHistory({ ...dentalHistory, injuryToFace: e.target.value })}
          />
          <label htmlFor="injuryToFaceNo">No</label>
        </div>

        <p>Do you ever feel like you have a dry mouth?</p>
        <div className="radio-options">
          <input
            type="radio"
            id="dryMouthYes"
            name="dryMouth"
            value="Yes"
            onChange={(e) => setDentalHistory({ ...dentalHistory, dryMouth: e.target.value })}
          />
          <label htmlFor="dryMouthYes">Yes</label>
          <input
            type="radio"
            id="dryMouthNo"
            name="dryMouth"
            value="No"
            onChange={(e) => setDentalHistory({ ...dentalHistory, dryMouth: e.target.value })}
          />
          <label htmlFor="dryMouthNo">No</label>
        </div>

        <p>Have you ever had an unusual reaction to local anesthetic?</p>
        <div className="radio-options">
          <input
            type="radio"
            id="unusualReactionYes"
            name="unusualReaction"
            value="Yes"
            onChange={(e) => setDentalHistory({ ...dentalHistory, unusualReaction: e.target.value })}
          />
          <label htmlFor="unusualReactionYes">Yes</label>
          <input
            type="radio"
            id="unusualReactionNo"
            name="unusualReaction"
            value="No"
            onChange={(e) => setDentalHistory({ ...dentalHistory, unusualReaction: e.target.value })}
          />
          <label htmlFor="unusualReactionNo">No</label>
        </div>

        <p>Do you clench your teeth?</p>
        <div className="radio-options">
          <input
            type="radio"
            id="clenchTeethYes"
            name="clenchTeeth"
            value="Yes"
            onChange={(e) => setDentalHistory({ ...dentalHistory, clenchTeeth: e.target.value })}
          />
          <label htmlFor="clenchTeethYes">Yes</label>
          <input
            type="radio"
            id="clenchTeethNo"
            name="clenchTeeth"
            value="No"
            onChange={(e) => setDentalHistory({ ...dentalHistory, clenchTeeth: e.target.value })}
          />
          <label htmlFor="clenchTeethNo">No</label>
        </div>
        <div className='Buttons-Container'> 
        <button className="back-button" onClick={handleBackButton}>Back</button>
      <button className="next-button" onClick={handleDentalHistorySubmit}>Next</button>
      </div>
      </div>
    </div>
  );
};

export default DentalHistoryForm;