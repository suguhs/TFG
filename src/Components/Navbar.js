import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const usuario = JSON.parse(localStorage.getItem('usuario'));
  const navigate = useNavigate();

  const cerrarSesion = () => {
    localStorage.removeItem('usuario');
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary px-4">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">Mi App</Link>
        <div className="collapse navbar-collapse show">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/">Inicio</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/comentarios">Comentarios</Link>
            </li>
          </ul>

          <ul className="navbar-nav">
            {usuario ? (
              <>
                <li className="nav-item">
                  <span className="nav-link">Hola, {usuario.nombre}</span>
                </li>
                <li className="nav-item">
                  <button onClick={cerrarSesion} className="btn btn-light btn-sm ms-2">Cerrar sesión</button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Iniciar sesión</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/registro">Registrarse</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
