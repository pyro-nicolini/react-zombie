import { createContext, useState } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {

const [auth, setAuth] = useState({
    autorizado: true,
    users: [{ email: "prueba@prueba.com", pass: "prueba@prueba.com" }],
    input: { email: "", pass: "", pass2: "", exito: "", error: "" },
    autenticado: { email: "prueba@prueba.com" },
  });

return (
<AuthContext.Provider value={{ auth, setAuth }}>
{children}
</AuthContext.Provider>
);
};
export default AuthProvider;