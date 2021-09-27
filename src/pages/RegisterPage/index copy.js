import { useState } from "react";

const Register = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    const requestBody = {
      email,
      password,
    };

    const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/users`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    if(res.ok) {
      alert("Te has registrado correctamente. Activa tu usuario")
    } else {
      alert("Hubo un error en el registro")
    }
  };
  return (
    <>
      <h1>Registro</h1>
      <form onSubmit={handleRegister}>
        <div className="txt_field">
          <label htmlFor="email">Correo electrónico</label>
          <input
            id="email"
            name="email"
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="txt_field">
          <label htmlFor="password">Contraseña</label>
          <input
            id="password"
            name="password"
            required
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit">Registro</button>
      </form>
    </>
  );
};

export default Register;
