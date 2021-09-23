import { useState } from "react";

export const Register = (props) => {
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const handleRegister = async (e) => {
    e.preventDefault();
    const requestBody = {
      name,
      userName,
      email,
      password,
      repeatPassword,
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
          <h1>Registro</h1>
          <form onSubmit={handleRegister}>
            <div class="txt_field">
              <input
                id="user-fullname"
                name="user-fullname"
                required="required"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                />
                <span></span>
                <label>Nombre</label>
            </div>
              <div class="txt_field">
              <input
                id="username"
                name="username"
                required="required"
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                />
                <span></span>
                <label>Nombre de usuario</label>
              </div>
              <div class="txt_field">
              <input
                id="email"
                name="email"
                required="required"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />
                <span></span>
                <label>Correo electrónico</label>
              </div>
              <div class="txt_field">
              <input
                id="password"
                name="password"
                required="required"
                type="password"
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
                <span></span>
                <label>Contraseña</label>
              </div>
              <div class="txt_field">
              <input
                id="confirm-password"
                name="confirm-password"
                required="required"
                type="password"
                value={repeatPassword}
                onChange={(e) => setRepeatPassword(e.target.value)}
              />
              <span></span>
              <label htmlFor="user-confirm-password">
                Confirma tu contraseña
              </label>
              </div>
            <button type="submit" value="Registro">
              REGISTRO
            </button>
          </form>
         </div>
      )}
    </>
  );
};