import { useState, useContext, useEffect } from "react";
import img1 from "../../img/avatar-prueba.jpeg"

function Avatar (props) {
  return (
    <>
      <img className="avatar" src={img1} alt="imagen de perfil" />
    </>
);
}

export { Avatar };