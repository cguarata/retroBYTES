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

};

return (
    <>
    <div className="center">
      <h1>Login</h1>
      <form method="post">
        <div class="txt_field">
        <input
                name="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />          <span></span>
          <label>Username</label>
        </div>
        <div class="txt_field">
        <input
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
          <span></span>
          <label>Password</label>
        </div>
        <input type="submit" value="Login"/>
        <div class="signup_link">       
          Not a member? 
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



