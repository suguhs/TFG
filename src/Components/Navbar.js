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
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Inicio</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/comentarios">Comentarios</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/menu">Menú</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/reserva">Reserva</Link>
            </li>
          </ul>

          <ul className="navbar-nav">
            {usuario ? (
              <li className="nav-item dropdown">
                <button
                  className="btn btn-light rounded-circle d-flex align-items-center justify-content-center"
                  id="perfilDropdown"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  style={{ width: "40px", height: "40px" }}
                >
                  <i className="bi bi-person-fill"></i>
                </button>
                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="perfilDropdown">
                  <li><Link className="dropdown-item" to="/historial">Ver historial</Link></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><button className="dropdown-item" onClick={cerrarSesion}>Cerrar sesión</button></li>
                </ul>
              </li>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="btn btn-outline-light btn-sm me-2" to="/login">Iniciar sesión</Link>
                </li>
                <li className="nav-item">
                  <Link className="btn btn-light btn-sm" to="/registro">Registrarse</Link>
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
