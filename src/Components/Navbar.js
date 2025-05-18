import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const usuario = JSON.parse(localStorage.getItem('usuario'));
  const navigate = useNavigate();

  const cerrarSesion = () => {
    localStorage.removeItem('usuario');
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary px-4">
      <div className="container-fluid d-flex justify-content-between align-items-center">
        
        {/* Perfil o acceso público */}
        <div className="d-flex align-items-center gap-2">
          {usuario ? (
            <div className="dropdown position-relative">
              <button
                className="btn btn-light rounded-circle"
                id="perfilDropdown"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                style={{ width: "40px", height: "40px" }}
              >
                <i className="bi bi-person-fill"></i>
              </button>
              <ul className="dropdown-menu" aria-labelledby="perfilDropdown">
                <li className="dropdown-item disabled text-dark">
                  👤 {usuario.nombre}
                </li>
                <li><Link className="dropdown-item" to="/historial">Ver historial</Link></li>
                <li><hr className="dropdown-divider" /></li>
                <li><button className="dropdown-item" onClick={cerrarSesion}>Cerrar sesión</button></li>
              </ul>
            </div>
          ) : (
            <>
              <Link className="btn btn-outline-light btn-sm me-2" to="/login">Iniciar sesión</Link>
              <Link className="btn btn-light btn-sm" to="/registro">Registrarse</Link>
            </>
          )}
          <Link className="navbar-brand ms-2" to="/">Mi App</Link>
        </div>

        {/* Menú de navegación */}
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item"><Link className="nav-link" to="/">Inicio</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/comentarios">Comentarios</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/menu">Menú</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/reserva">Reserva</Link></li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
