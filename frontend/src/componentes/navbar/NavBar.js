import React from 'react'
import { Link } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';


const Navbar= () => {
    return (
        <>
            <nav className="nav-bar">
                <Link to="/" className="retrobytes-logo">
                    <h1>Logo</h1>
                </Link>
                <FaBars className="menu-icon"/>
                <div className="nav-menu">
                    <Link to="/chat" className="nav-link">
                    <i class="fas fa-comments"></i>
                        Chat
                    </Link>
                    <Link to="/notificaciones" className="nav-link">
                        <i class="fas fa-bell"></i>
                            Notificaciones
                    </Link>
                    <Link to="/compras" className="nav-link">
                        <i class="fas fa-shopping-cart"></i>
                            Compras
                    </Link>
                    <Link to="/perfil" className="nav-button">
                        <i class="fas fa-user"></i>
                            Perfil
                    </Link>
                </div>
            </nav>
        </>
    );
};

export default Navbar;
