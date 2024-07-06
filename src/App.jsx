import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Components/login/Login";
import SignUp from "./Components/login/Signup";
import Homepage from "./Pages/Homepage";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<Homepage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
