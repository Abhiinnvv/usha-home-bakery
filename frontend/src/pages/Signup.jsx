import {
  useState,
  useContext
} from "react";

import {
  AuthContext
} from "../contexts/AuthContext";

import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate =
    useNavigate();

  const { signup } =
    useContext(
      AuthContext
    );

  const [formData, setFormData] =
    useState({
      name: "",
      email: "",
      mobileNumber: "",
      password: ""
    });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value
    });
  };

  const handleSubmit =
    async (e) => {
      e.preventDefault();

      await signup(
        formData
      );

      navigate("/");
    };

  return (
    <div className="p-8 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6">
        Signup
      </h1>

      <form
        onSubmit={
          handleSubmit
        }
        className="space-y-4"
      >
        <input
          type="text"
          name="name"
          placeholder="Name"
          onChange={
            handleChange
          }
          className="w-full border p-2"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={
            handleChange
          }
          className="w-full border p-2"
        />

        <input
          type="text"
          name="mobileNumber"
          placeholder="Mobile Number"
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
          Signup
        </button>
      </form>
    </div>
  );
}

export default Signup;