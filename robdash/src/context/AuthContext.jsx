import { createContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { api } from "../services/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadingStoreData = () => {
      const storageUser = localStorage.getItem("@Auth:user");
      const storageToken = localStorage.getItem("@Auth:token");

      if (storageUser && storageToken) {
        setUser(storageUser);
      }
    };
    loadingStoreData();
  }, []);

  const signIn = async ({ email, password }) => {
    try {
      const {data} = await api.post("/PRTL001", { USUARIO: email, SENHA: password });
      const response = data.statusrequest[0]

      if (response.code === '#200') {

        api.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${response.user_token}`;

        localStorage.setItem("@Auth:user", response.Cod_Usuario);
        localStorage.setItem("@Auth:token", response.user_token);
        setUser(response.Cod_Usuario)

      } else {
          alert(response.Cod_Usuario)
      } 

    } catch (error) {
      console.log(error);
    }
  };

  const singOut = () => {
    localStorage.clear();
    setUser(null);
    return <Navigate to="/" />;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        signIn,
        singOut,
        signed: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
