import React from 'react'
import { useContext } from "react";
import { Link } from 'react-router-dom'
import {Avatar} from '../componentes/perfil/Avatar'
import { Redirect } from "react-router-dom";


const Perfil = () => {
const token=12214312   
const handleLogout = (e) => {
       e.preventDefault();
       token=""
       console.log(`token valor "${token}"`)
  };
   
    return (
       <>{ token ?(
       <div className="center-profile">
            <Avatar/>
            <h1>Username</h1>
            <Link to="/actualizar-datos-usuario">   
            <button type="submit">Editar</button>
            </Link>
            <button type="submit" onClick={handleLogout}>Cerrar sesion</button>
            <div>
            <button type="submit">Mis Productos</button>
            <button type="submit">Mis Reservas</button>
            <Link to="/producto-nuevo">
                    <button type="submit">Agregar Producto</button>
                </Link>
            </div>
        </div>
         ) : (
            <Redirect to="/login" />
          )}
       </>
    )
}

export default Perfil