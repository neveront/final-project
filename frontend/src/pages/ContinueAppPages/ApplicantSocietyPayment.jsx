import React, { useState, useEffect, useRef } from 'react';
import { useActiveItem } from "../../contexts/CreateAppContext";
import { useNavigate } from 'react-router-dom';

const DocumentVerification = () => {
  const [isNextButtonDisabled, setIsNextButtonDisabled] = useState(false);
  const divRef = useRef(null);
   const { setActiveItem } = useActiveItem();
        const navigate = useNavigate();
      
        const handleSecondClick = (item) => {
          if (!isNextButtonDisabled) {
            navigate('/createapplication/enrollment-completed');// Navigate to the desired route
            setActiveItem(item);
          } 
        };

  return (
    <div 
      ref={divRef}
      className="w-full min-h-screen  bg-[#ffffffad] p-8 pt-12 shadow-xl rounded-lg flex flex-col">
      
      {/* Header Section */}
      <div className="relative text-center my-10">
        <h1 className="text-3xl font-extrabold text-[#001800]">Society Payment</h1>
        
          <button onClick={() => handleSecondClick('/enrollment-completed')}
            className={`absolute right-0 top-1/2 text-[#345e34] hover:text-green-900 ${isNextButtonDisabled ? "opacity-50 cursor-not-allowed" : ""}`}
            disabled={isNextButtonDisabled}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
     
      </div>

      {/* Content Section */}
<div className="flex justify-center bg-white shadow-lg py-[5%] rounded-lg items-center flex-col h-full">
  <h5 className="text-2xl font-extrabold text-[#1b1b1b] mb-6 pt-8">Society Payment Status</h5>
  
 
  <div><p className="text-lg mt-3 text-gray-500">Your Payment Is Pending </p></div>



       
        </div>
      </div>
  );
};

export default DocumentVerification;
