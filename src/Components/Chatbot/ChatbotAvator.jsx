import React from 'react'
// import img from "../../assets/sciastra.webp";
import img from "../../assets/logo.jpeg";


const ChatbotAvator = ({setIsActive }) => {
  
    return (
      <div
        className="rounded-full bg-[#234eb0] p-2 cursor-pointer"
        onClick={() => setIsActive(true)}
      >
        <span className="text-white   ">
          <img src={img} alt="" className="rounded-full w-10" />
        </span>
      </div>
    );
  };

export default ChatbotAvator