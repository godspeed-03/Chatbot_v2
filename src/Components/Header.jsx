import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const storedLogger = JSON.parse(sessionStorage.getItem("logger")) || [];
  let loggeduser = storedLogger[0]?.username;
  const [mobile, setMobile] = useState(false);
  const openmobile = () => {
    setMobile(true);
  };

  const navigate = useNavigate();

  const gotologin = () => {
    navigate('/login')
  }

  const logout = () =>{
    sessionStorage.clear()
    navigate('/')
  }


  return (

<div className="header flex items-center justify-between px-5 bg-cyan-600 h-16">
        <div className="logo">LOGO</div>
        <div className="welcome-message font-bold font-mono sm:text-xl text-center">
          Welome to ImageBook, {loggeduser ? loggeduser : "Guest"}
        </div>
        <div className="option bg-gray-300 border p-2 text-black font-semibold rounded-lg">
        {loggeduser ? (
                <button onClick={logout} value="logout">Logout</button>
              ) : (
                <button onClick={gotologin} value="login">Login</button>
              )}
        </div>
        </div>
        
  
  );
};

export default Header;
