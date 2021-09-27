import { useState, useContext, useEffect } from "react";

export const ProfileUpdate = (props) => {

    const [name, setName] = useState("");
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const handleUpdate = async (e) => {
    e.preventDefault();
    const requestBody = {
        name,
        userName,
        email,
        password,
        repeatPassword,
      };
      const res = await fetch("", {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(requestBody),
        });
    };
  return (
    <>
      <div className="center">
          <h1>Actualiza tus Datos</h1>
          <form onSubmit={handleUpdate}>
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
                <label>Nuevo Nombre</label>
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
                <label>Nuevo Nombre de usuario</label>
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
                <label>Nuevo Correo electrónico</label>
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
                <label>Nueva Contraseña</label>
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
                Confirma tu Nueva contraseña
              </label>
              </div>
            <button type="submit" value="Registro">
              ACTUALIZAR
            </button>
          </form>
         </div>
    </>
  );
};