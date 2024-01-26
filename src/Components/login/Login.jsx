import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState();
  // Use useNavigate instead of useHistory
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    // Perform your login logic here
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(
      (user) => user.username === username && user.password === password
    );

    if (user) {
      // Use navigate function instead of history.push
      navigate("/homepage");

      const logger = JSON.parse(sessionStorage.getItem("logger")) || [];
      const newlogger = {
        username: username,
        password: password,
      };

      logger.push(newlogger);
      sessionStorage.setItem("logger", JSON.stringify(logger));
    } else {
      alert("Invalid username or password. Please try again.");
    }
  };

  return (
    <div className="flex items-center h-screen w-full">
      <div className="w-full bg-white rounded shadow-lg p-8 m-4 md:max-w-sm md:mx-auto">
        <span className="block w-full text-xl uppercase font-bold mb-4">
          Login
        </span>
        <form onSubmit={handleSubmit} className="mb-4">
          <div className="mb-4 md:w-full">
            <label htmlFor="email" className="block text-xs mb-1">
              Username or Email
            </label>
            <input
              className="w-full border rounded p-2 outline-none focus:shadow-outline"
              type="text"
              placeholder="Username, mail, or Phone Number"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-6 md:w-full">
            <label htmlFor="password" className="block text-xs mb-1">
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
            Login
          </button>
        </form>
        <Link className="text-blue-700 text-center text-sm" to="/signup">
          Sign up
        </Link>
      </div>
    </div>
  );
};

export default Login;
