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

  const handleOptionSelect = (event) => {
    const selectedOption = event.target.value;
    if (selectedOption === "login") {
      navigate("/login");
    } else if (selectedOption === "logout") {
      sessionStorage.clear();
      navigate("/");
    }
  };

  return (
    <>
      <div
        className={`header flex items-center justify-between py-5
    ${mobile ? "bg-yellow-500" : "bg-sky-300"}`}
      >
        <div className="logo">LOGO</div>
        <nav>
          <div>
            <select id="menu" onChange={handleOptionSelect}>
              <option value="">{loggeduser ? loggeduser : "Guest"}</option>
              {loggeduser ? (
                <option value="logout">Logout</option>
              ) : (
                <option value="login">Login</option>
              )}
            </select>
          </div>
        </nav>
        <div className="md:hidden">
          {mobile ? (
            <span className="font-bold p-2" onClick={() => setMobile(false)}>
              C
            </span>
          ) : (
            <span className="font-bold p-2" onClick={() => openmobile()}>
              O
            </span>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
