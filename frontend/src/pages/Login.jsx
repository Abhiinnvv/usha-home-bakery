import {
  useState,
  useContext
} from "react";

import {
  AuthContext
} from "../contexts/AuthContext";

import { useNavigate } from "react-router-dom";

function Login() {
  const navigate =
    useNavigate();

  const { login } =
    useContext(
      AuthContext
    );

  const [formData, setFormData] =
    useState({
      login: "",
      password: ""
    });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value
    });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  await login(formData);

  const user = JSON.parse(localStorage.getItem("user"));

  if (user?.role === "admin") {
    navigate("/dashboard");
  } else {
    navigate("/");
  }
};

  return (
    <div className="p-8 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6">
        Login
      </h1>

      <form
        onSubmit={
          handleSubmit
        }
        className="space-y-4"
      >
        <input
          type="text"
          name="login"
          placeholder="Email or Mobile"
          onChange={
            handleChange
          }
          className="w-full border p-2"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={
            handleChange
          }
          className="w-full border p-2"
        />

        <button className="bg-pink-600 text-white px-4 py-2 w-full">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;