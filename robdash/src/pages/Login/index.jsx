import { Link, Navigate } from "react-router-dom";
import { useState } from "react";

import jpIMG from "../../assets/logo.svg";
import { LayoutComponents } from "../../components/LayoutComponents";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signIn, signed } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      email,
      password,
    };
    await signIn(data);
  };
  console.log(signed);
  if (!signed) {
    return (
      <LayoutComponents>
        <form onSubmit={handleSubmit} className="login-form">

          <span className="login-form-title">
            <img src={jpIMG} />
          </span>

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
            <button type="submit" className="login-form-btn">
              Login
            </button>
          </div>

        </form>
      </LayoutComponents>
    );
  } else {
    return <Navigate to="/home" />;
  }
};
