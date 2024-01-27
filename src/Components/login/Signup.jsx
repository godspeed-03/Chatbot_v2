import React, { useState } from "react";
// import sitelogo from '../../assets/sitelogo.png';
import { Outlet, Link } from "react-router-dom";
// import './login.css';

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");


  // singup  form action method
  const handleSubmit = (event) => {
    event.preventDefault();

    // create localstorage db
    const users = JSON.parse(localStorage.getItem("users")) || [];

    //check for username
    const existingUser = users.find((user) => user.username === username);

    if (existingUser) {
      alert("Username already exists. Please choose a different username.");
    } else {
      let sno = 0;
      if (users.length > 0) {
        sno = sno + 1;
      }

      // schema for user signup
      const newUser = {
        sno: sno,
        name: name,
        email: email,
        username: username,
        password: password,
      };

      users.push(newUser);

      localStorage.setItem("users", JSON.stringify(users));

      alert("Sign-up successful! Please login.");
      document.getElementById("signup-form").reset();
    }
  };

  return (
    <div className="flex items-center h-screen w-full">
      <div className="w-full bg-white rounded shadow-lg p-8 m-4 md:max-w-sm md:mx-auto">
        <span className="block w-full text-xl uppercase font-bold mb-4">
          Sign up
        </span>
        <form onSubmit={handleSubmit} className="mb-4">
          <div className="mb-4 md:w-full">
            <label htmlfor="email" className="block text-xs mb-1">
              Name
            </label>
            <input
              className="w-full border rounded p-2 outline-none focus:shadow-outline"
              type="text"
              name="name"
              placeholder="Name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-4 md:w-full">
            <label htmlfor="email" className="block text-xs mb-1">
              Email
            </label>
            <input
              className="w-full border rounded p-2 outline-none focus:shadow-outline"
              type="email"
              name="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4 md:w-full">
            <label htmlfor="email" className="block text-xs mb-1">
              Username
            </label>
            <input
              className="w-full border rounded p-2 outline-none focus:shadow-outline"
              type="text"
              name="username"
              placeholder="Username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-6 md:w-full">
            <label htmlfor="password" className="block text-xs mb-1">
              Password
            </label>
            <input
              className="w-full border rounded p-2 outline-none focus:shadow-outline"
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-700 text-white uppercase text-sm font-semibold px-4 py-2 rounded"
          >
            Sign Up
          </button>
        </form>
        <Link to="/login" className="text-blue-700 text-center text-sm">
          Login
        </Link>
        <Outlet />
      </div>
    </div>
  );
};

export default SignUp;
