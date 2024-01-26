import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from "./Components/login/Login"
import SignUp from "./Components/login/Signup"
import Homepage from "./Pages/Homepage"

 
function App() {

  return (
    <>
      <Router>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/homepage" element={<Homepage />} />

      </Routes>
    </Router>
    </>
  )
}

export default App
