import {React,useState,useContext} from "react";
import { Link, Navigate } from "react-router-dom";
import { Header } from '../components';
import { useStateContext } from '../contexts/ContextProvider';
import logo from '../assets/logo.svg'

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {signed,signIn} = useStateContext();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
          email,
          password,
        };
        await signIn(data);
      };

    if (!signed) {
        return (
            <div className="container-login">
                <div className="wrap-login">
                    <form onSubmit={handleSubmit} className="login-form">
                        <span className="login-form-title">
                            <img src={logo} alt="logo" />
                        </span>

                        <span className="login-form-title"> Bem vindo </span>

                        <div className="wrap-input">
                            <input
                            className={email !== "" ? "has-val input" : "input"}
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            />
                            <span className="focus-input" data-placeholder="Email"></span>
                        </div>

                        <div className="wrap-input">
                            <input
                            className={password !== "" ? "has-val input" : "input"}
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            />
                            <span className="focus-input" data-placeholder="Password"></span>
                        </div>

                        <div className="container-login-form-btn">
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
