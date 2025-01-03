import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../../contexts/AppContext";
import { useActiveItem } from "../../contexts/CreateAppContext";

const Details = () => {
  const { applicantType, seniorHighTrack, strand, preferredProgram } = useAppContext();
  const { setActiveItem } = useActiveItem();
  const navigate = useNavigate();

  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  // Full names mapping for display
  const fullNames = {
    als: "Alternative Learning System (ALS) Passer",
    foreign: "Foreign Undergraduate Student Applicant",
    shs: "Senior High School Graduate",
    grade12: "Currently Enrolled Grade 12 Student",
    bachelors: "Bachelor's Degree Graduate",
    transferee: "Transferee",
    stem: "Science, Technology, Engineering, and Mathematics (STEM)",
    abm: "Accountancy, Business, and Management (ABM)",
    humss: "Humanities and Social Sciences (HUMSS)",
    gas: "General Academic Strand (GAS)",
    afa: "Agri-Fishery Arts (AFA)",
    he: "Home Economics (HE)",
    ia: "Industrial Arts (IA)",
    ict: "Information and Communications Technology (ICT)",
    ad: "Arts and Design",
    sports: "Sports",
    it: "Bachelor of Science in Information Technology",
    cs: "Bachelor of Science in Computer Science",
  };

  // Handle button click to navigate and set active item
  const handleButtonClick = (item) => {
    navigate("/createapplication/personal"); // Navigate to personal section
    setActiveItem(item); // Set the active item in context
  };

  // Check if the form is complete and enable the button
  useEffect(() => {
    const isFormComplete =
      applicantType && preferredProgram && (seniorHighTrack || strand);
    setIsButtonDisabled(!isFormComplete);
  }, [applicantType, seniorHighTrack, strand, preferredProgram]);

  // Function to render detail sections dynamically
  const renderDetail = (label, value) => (
    <div className="mb-6 mx-11">
      <p className="text-gray-600 text-lg font-semibold mb-2">{label}:</p>
      <p className="text-[#081708] text-lg">{value || "Not provided"}</p>
    </div>
  );

  return (
    <div className="w-full min-h-screen bg-white p-8 pt-12 shadow-xl rounded-lg flex flex-col justify-between">
      {/* Header and Navigation Button */}
      <div className="relative text-center my-10">
        <h1 className="text-3xl font-extrabold text-[#001800]">Application Details</h1>
        <button
          onClick={() => handleButtonClick('/personal')}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 text-[#345e34] hover:text-green-900"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Applicant Details */}
      {renderDetail("Applicant Type", fullNames[applicantType] || applicantType)}
      {seniorHighTrack && renderDetail("Senior High Track", fullNames[seniorHighTrack] || seniorHighTrack)}
      {strand && renderDetail("Strand", fullNames[strand] || strand)}
      {renderDetail("Preferred Program", preferredProgram)}

      {/* Cancel Application Button */}
      <div className="flex justify-end gap-5 my-11 mx-7">
        <Link to="/create" className="w-full flex text-left">
          <button
            className="px-6 py-2 bg-red-500 text-white font-bold rounded-lg hover:bg-red-700 focus:outline-none"
            disabled={isButtonDisabled}
          >
            Cancel Application
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Details;
