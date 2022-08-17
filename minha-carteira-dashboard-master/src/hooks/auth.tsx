import React, { createContext, useState, useContext } from 'react';
import { api } from "../services/api";

interface IAuthContext {
    logged: boolean;
    signIn(email: string, password: string): void;
    signOut(): void;
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext);

const teste = async(email: string, password: string) => {
    alert(email)
    const { data } = await api.post("/PRTL001", { USUARIO: email, SENHA: password });
    console.log(JSON.stringify(data))
}

const AuthProvider: React.FC = ({ children }) => {
    const [logged, setLogged] = useState<boolean>(() => {
        const isLogged = localStorage.getItem('@minha-carteira:logged');

        return !!isLogged;
    });

    const signIn = (email: string, password: string) => {
        
        teste(email,password)
        



       /* if(email === 'felipemayer00@gmail.com' && password === '1234'){
            localStorage.setItem('@minha-carteira:logged', 'true');
            setLogged(true);
        }else{
            alert('Senha ou usuário inválidos!');
        }*/
    }

    const signOut = () => {
        localStorage.removeItem('@minha-carteira:logged');
        setLogged(false);
    }

    return (
        <AuthContext.Provider value={{logged, signIn, signOut}}>
            {children}
        </AuthContext.Provider>
    );
}

function useAuth(): IAuthContext {
    const context = useContext(AuthContext);

    return context;
}

export { AuthProvider, useAuth };