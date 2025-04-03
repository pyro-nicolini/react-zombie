import { createContext, useState } from "react";
import useInput from "../hooks/useInput";
import { useNavigate } from "react-router-dom";

export const userContext = createContext();

const UserProvider = ({ children }) => {
  const navigate = useNavigate();
  const [auth, setAuth] = useState({
    autorizado: false,
    autenticado: { email: "" },
  });

  const email = useInput("");
  const password = useInput("");

  const [error, setError] = useState("");
  const [exito, setExito] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.value,
          password: password.value,
        }),
      });
      const data = await response.json();

      if (data?.error) {
        setExito("");
        setError(data.error);
        return;
      }
      setError("");
      setExito("Authentication successful!");

      setAuth({
        autorizado: true,
        autenticado: { email: data.email },
      });

      localStorage.setItem("token", data.token);
        setLoading(true);

      setTimeout(() => {
        setLoading(false);
        navigate("/cart", { replace: true });
      }, 2000);
    } catch (e) {
      console.error("Error in login process:", e);
      setError("Error connecting to the server. Please try again.");
    } finally {
      setTimeout(() => {
        setError("");
        setExito("");
        email.reset();
        password.reset();
  
      }, 2000);
      clearTimeout;
    }
  };

  const pass2 = useInput("");

  const handleSubmitRegister = async (e) => {
    e.preventDefault();

    if (pass2.value !== password.value) {
      return setError("Las contraseñas no coinciden");
    }
    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.value,
          password: password.value,
        }),
      });
      const data = await response.json();

      if (data?.error) {
        setExito("");
        setError(data.error);
        return;
      }
      setError("");
      setExito("Authentication successful!");

      localStorage.setItem("token", data.token);
        setLoading(true);

      setTimeout(() => {
        setLoading(false);
        navigate("/login", { replace: true });
      }, 2000);
    } catch (e) {
      console.error("Error in register process:", e);
      setError("Error connecting to the server. Please try again.");
    } finally {
      email.reset();
      password.reset();
      pass2.reset();
      setTimeout(() => {
        setError("");
        setExito("");
      }, 2000);
      clearTimeout;
    }
  };


  function cerrarSesion(setAuth) {
    localStorage.removeItem("token");
    localStorage.clear();
    setAuth((prev) => ({
      ...prev,
      autorizado: false,
      autenticado: null,
    }));
  }
  
  
  return (
    <userContext.Provider
      value={{
        auth,
        setAuth,
        handleSubmitLogin,
        handleSubmitRegister,
        error,
        exito,
        email,
        password,
        pass2,
        loading,
        cerrarSesion,
      }}
    >
      {children}
    </userContext.Provider>
  );
};
export default UserProvider;
