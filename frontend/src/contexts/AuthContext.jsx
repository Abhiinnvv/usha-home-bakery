import {
  createContext,
  useState,
  useEffect
} from "react";

import API from "../services/api";

export const AuthContext =
  createContext();

function AuthProvider({
  children
}) {
  const [user, setUser] =
    useState(null);

  useEffect(() => {
    const storedUser =
      localStorage.getItem(
        "user"
      );

    if (storedUser) {
      setUser(
        JSON.parse(
          storedUser
        )
      );
    }
  }, []);

 const signup = async (formData) => {
  const { data } = await API.post("/auth/register", formData);

  localStorage.setItem("user", JSON.stringify(data));
  localStorage.setItem("token", data.token);

  setUser(data);
};

  const login = async (formData) => {
  try {
    console.log("Sending:", formData);

    const { data } = await API.post("/auth/login", formData);

    console.log("Response:", data);

    localStorage.setItem("user", JSON.stringify(data));
    localStorage.setItem("token", data.token);

    setUser(data);
  } catch (err) {
    console.log("Error:", err);
    console.log("Response:", err.response);
    console.log("Data:", err.response?.data);
    console.log("Status:", err.response?.status);
    throw err;
  }
};

  const logout = () => {
    localStorage.removeItem(
      "user"
    );

    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        signup,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;