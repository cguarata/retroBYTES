import React from 'react'
import { useContext, useState } from "react";
import { Link, Redirect } from "react-router-dom";
    
const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = async (e) => {
    e.preventDefault();
    const requestBody = {
      username,
      password,
    };
    const res = await fetch("", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });
    
  };

return (
    <>
    <div className="center">
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div class="txt_field">
        <input
                id="username"
                name="username"
                required="required"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />          
          <span></span>
          <label>Username</label>
        </div>
        <div className="txt_field">
        <input
                id="password"
                name="password"
                required="required"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
          <span></span>
          <label>Password</label>
        </div>
        <input type="submit" value="Login"/>
        <div className="signup_link">       
          ¿No estas Registrado?
        <Link to="/register">
            <input 
            type="submit"
            value="Registrate"
            ></input>
        </Link>
       
       
        </div>
      </form>
    </div>

       
    </>
);
};

export default Login



