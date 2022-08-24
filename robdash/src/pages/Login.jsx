import { React, useState } from "react";
import { Navigate } from "react-router-dom";
import { useStateContext } from '../contexts/ContextProvider';
import logo from '../assets/logo.svg'

const Login = () => {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const {signed,signIn,currentColor,currentMode} = useStateContext();

    const handleSubmit = async (e) => {
        e.preventDefault();

        await signIn({login,password});
      };

    if (!signed) {
        return (
            <div  className={currentMode === 'Dark' ? 'dark container-login ' : 'container-login'}>
                <div className="wrap-login" style={{backgroundColor:currentMode === 'Dark' ? '#333' : '#fff'}}>
                    <form onSubmit={handleSubmit} className="login-form">
                        <span className="login-form-title">
                            <img src={logo} alt="logo" />
                        </span>

                        <span className="login-form-title" style={{color:currentMode === 'Dark' ? '#fff' : '#444'}}> Bem vindo </span>

                        <div className="wrap-input">
                            <input
                                style={{color:currentMode === 'Dark' ? '#fff' : '#444'}}
                                className={login !== "" ? "has-val input" : "input" }
                                value={login}
                                onChange={(e) => setLogin(e.target.value)}
                            />
                            <span className="focus-input" data-placeholder="Login"></span>
                        </div>

                        <div className="wrap-input">
                            <input
                                style={{color:currentMode === 'Dark' ? '#fff' : '#444'}}
                                className={password !== "" ? "has-val input" : "input"}
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <span className="focus-input" data-placeholder="Senha"></span>
                        </div>

                        <div className="container-login-form-btn" style={{ backgroundColor: currentColor }}>
                            <button type="submit" className="login-form-btn">Login</button>
                        </div>
                    </form>
                </div>
            </div>
        );
        
    } else {
        return <Navigate to="/dashboard" />;
    }

};

export default Login;
