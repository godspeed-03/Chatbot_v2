import React from "react";
import { useNavigate, Link } from "react-router-dom";
import logo from '../assets/logo.jpeg'

const Header = () => {

  //get username from session storage
  const storedLogger = JSON.parse(sessionStorage.getItem("logger")) || [];
  let loggeduser = storedLogger[0]?.username;

  const navigate = useNavigate();

  const gotologin = () => {
    navigate("/login");
  };

  const logout = () => {
    sessionStorage.clear();
    navigate("/");
    window.location.reload();
  };

  return (
    <div className="header flex items-center justify-between px-5 bg-[#234eb0] h-16">
      <div className="logo">
        <Link to="/">
        <img className="rounded-full w-16 p-2" src={logo} alt="Site logo" />
        </Link>
      </div>
      <div className="welcome-message font-bold font-mono sm:text-xl text-center">
        Welome to ImageBook, {loggeduser ? loggeduser : "Guest"}
      </div>
      <div className="option bg-gray-300 border p-2 text-black font-semibold rounded-lg">
        {loggeduser ? (
          <button onClick={logout} value="logout">
            Logout
          </button>
        ) : (
          <button onClick={gotologin} value="login">
            Login
          </button>
        )}
      </div>
    </div>
  );
};

export default Header;
