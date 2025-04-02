import { createContext, useState } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {

const [auth, setAuth] = useState({
    autorizado: false,
    autenticado: { email: "" },
  });

return (
<AuthContext.Provider value={{ auth, setAuth }}>
{children}
</AuthContext.Provider>
);
};
export default AuthProvider;



