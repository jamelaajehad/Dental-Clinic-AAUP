import './PatientInformation.css';
import { useState } from 'react';

const PatientInformation = () => {
const [patientName, setPatientName] = useState('');
const [fileNumber, setFileNumber] = useState('');
const [studentName, setStudentName] = useState('');
const [studentNumber, setStudentNumber] = useState('');
const [provisionalTreatmentPlan, setProvisionalTreatmentPlan] = useState('');
const [currentPage, setCurrentPage] = useState(1);
const handleSubmit = (e) => {
    e.preventDefault();
    setCurrentPage(2);
};

const handleSave = () => {
    // Handle save functionality here
    alert('Form data saved successfully!');
};

return (
    <div className="patient-information">
        {currentPage === 1 && (
            <div className="form-container">
                <h1 className="form-title">Patient Information</h1>
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
                        <label className="form-label">File Number:</label>
                        <input
                            type="text"
                            className="form-input"
                            value={fileNumber}
                            onChange={(e) => setFileNumber(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Student Name:</label>
                        <input
                            type="text"
                            className="form-input"
                            value={studentName}
                            onChange={(e) => setStudentName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Student Number:</label>
                        <input
                            type="text"
                            className="form-input"
                            value={studentNumber}
                            onChange={(e) => setStudentNumber(e.target.value)}
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
            <div className="asa-sections">
                <div className="asa-section">
                    <h2 className="asa-title">ASA I (Fourth Year)</h2>
                    <ul className="asa-list">
                        <li><input type="checkbox" /> Surgery</li>
                        <li><input type="checkbox" /> Cons</li>
                        <li><input type="checkbox" /> Ortho</li>
                        <li><input type="checkbox" /> Peado</li>
                        <li><input type="checkbox" /> Prostho</li>
                        <li><input type="checkbox" /> Endo</li>
                        <li><input type="checkbox" /> Perio</li>
                        <li className="separator"><input type="checkbox" /> Simple</li>
                    </ul>
                </div>
                <div className="asa-section">
                    <h2 className="asa-title">ASA II (Fifth Year)</h2>
                    <ul className="asa-list">
                        <li><input type="checkbox" /> Surgery</li>
                        <li><input type="checkbox" /> Cons</li>
                        <li><input type="checkbox" /> Ortho</li>
                        <li><input type="checkbox" /> Peado</li>
                        <li><input type="checkbox" /> Prostho</li>
                        <li><input type="checkbox" /> Endo</li>
                        <li><input type="checkbox" /> Perio</li>
                        <li className="separator"><input type="checkbox" /> Complex</li>
                    </ul>
                </div>
                <div className="signature-box">
                    <p className="signature-label">Doctor Signature: _______________________________________________</p>
                    <div className="signature-dots">
                    </div>
                    <button onClick={handleSave} className="save-button">Save</button>
                </div>
            </div>
        )}
    </div>
);}
    export default PatientInformation;